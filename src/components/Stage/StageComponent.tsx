import { useEffect, useState } from 'react'
import { useStage } from 'hooks/useStage'
import { useSessions } from 'hooks/useSessions'
import StreamethPlayer from 'components/Player'
import { PageContainer } from 'components/Container'
import SessionInfoBox from 'components/Session/Infobox'
import StageSelector from 'components/Stage/Selector'
import SpeakerModalBox from 'components/Speaker/ModalBox'
import SessionList from 'components/Session/List'
import Modal from '../Modal'
import { ShareBox } from '../Share/Box'
import { Speaker } from 'types'

export function StageComponent() {
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
          <div className="flex flex-col w-full h-xl:h-full xl:w-4/5">
              <StreamethPlayer stage={currentStage}  />
            <div className="mt-auto">
              <div>
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
            <div className="flex flex-col w-full overflow-y-auto">
              <SessionList timeState={timeState} sessions={sessions} currentSession={currentSession} isLive={false} />
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
