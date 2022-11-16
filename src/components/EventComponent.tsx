import { useEffect, useState } from 'react'
import { useStage } from 'hooks/useStage'
import useLivestream from 'hooks/useLivestream'
import { PageContainer } from 'components/Container'
import SessionInfoBox from './Session/Infobox'
import styles from './EventComponent.module.scss'
import StageSelector from 'components/Stage/Selector'
import Player from './Player'
import { useSessions } from 'hooks/useSessions'
import Modal from './Modal'
import { ShareBox } from './Share/Box'
import { Speaker } from 'types'
import SpeakerModalBox from './Speaker/ModalBox'
import SessionList from './Session/List'

export function EventComponent() {
  const currentStage = useStage()
  const { timeState, currentSession, eventDayNum, sessions, setFilters } = useSessions()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContentType, setModalContentType] = useState<string | null>(null)
  const [speaker, setSpeaker] = useState<Speaker | undefined>(undefined)

  useEffect(() => {
    setFilters([
      { type: 'stage', value: currentStage.name },
      { type: 'day', value: eventDayNum },
    ])
  }, [currentStage, eventDayNum, setFilters])

  const { activeSource, onStreamError } = useLivestream(currentStage?.stream.map((i) => i.id) ?? [])

  // Modal probably needs to be global context
  const openModal = (type: 'share' | 'speaker', speaker?: Speaker) => {
    setModalContentType(type)
    setSpeaker(speaker)
    setModalOpen(true)
  }

  const modalContent = () => {
    if (modalContentType === 'share') {
      return <ShareBox title={currentSession.name} />
    } else if (modalContentType === 'speaker') {
      return <SpeakerModalBox speaker={speaker} />
    }

    return null
  }

  return (
    <div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalContent()}
      </Modal>
      <PageContainer>
        <div className="flex flex-col xl:flex-row h-full">
          {/* <div className={styles.header}>
            <EventHeader title={currentSession.name} showLive={!!activeSource} />
          </div> */}
          <div className=" bg-black flex flex-col w-full h-xl:h-full xl:w-4/5">
            <div className="w-full xl:h-full relative h-[300px] lg:h-[500px]">
              <Player source={activeSource} onStreamError={onStreamError} />
            </div>
            <div className="mt-auto">
              <div className={styles.eventInfo}>
                <SessionInfoBox
                  session={currentSession}
                  onShareClick={() => openModal('share')}
                  onSpeakerClick={(speaker) => openModal('speaker', speaker)}
                />
              </div>
            </div>
          </div>
          <div className="xl:w-1/5 p-3 xl:p-5 box-border flex flex-col overflow-auto">
            <h3 className="text-2xl font-bold dark:text-white flex">Schedule</h3>
            <div className="flex w-full py-4">
              <StageSelector />
            </div>
            <div className="flex flex-col w-full overflow-y-scroll">
              <SessionList timeState={timeState} sessions={sessions} currentSession={currentSession} isLive={!!activeSource} />
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
