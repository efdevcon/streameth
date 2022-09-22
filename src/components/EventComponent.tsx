import { useEffect, useState } from 'react'
import { useEvent } from 'hooks/useEvent'
import { useStage } from 'hooks/useStage'
import useLivestream from 'hooks/useLivestream'
import Container from 'components/Container'
import EventHeader from './Event/Header'
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
  const event = useEvent()
  const currentStage = useStage()
  const { timeState, currentSession, eventDayNum, sessions, setFilters } = useSessions(event)
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
      <Container>
        <div className={styles.widget}>
          <div className={styles.header}>
            <EventHeader title={currentSession.name} showLive={!!activeSource} />
          </div>
          <div className={styles.player}>
            <Player source={activeSource} onStreamError={onStreamError} />
          </div>
          <div className={styles.sidebar}>
            <h3 className="text-2xl font-bold dark:text-white">Schedule</h3>
            <StageSelector />
            <SessionList timeState={timeState} sessions={sessions} currentSession={currentSession} isLive={!!activeSource} />
          </div>
          <div className={styles.eventInfo}>
            <SessionInfoBox
              session={currentSession}
              onShareClick={() => openModal('share')}
              onSpeakerClick={(speaker) => openModal('speaker', speaker)}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
