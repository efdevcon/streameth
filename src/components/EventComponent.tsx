import { useEffect, useState } from 'react'
import { useEvent } from 'hooks/useEvent'
import { useStage } from 'hooks/useStage'
import useLivestream from 'hooks/useLivestream'
import Container from 'components/Container'
import EventHeader from './Event/Header'
import SessionInfoBox from './Session/Infobox'
import styles from './EventComponent.module.scss'
import Player from './Player'
import { useSessions } from 'hooks/useSessions'
import Modal from './Modal'
import { ShareBox } from './Share/Box'
import { Speaker } from 'types'
import SpeakerModalBox from './Speaker/ModalBox'
import Sidebar from './Sidebar'

interface Props {
  embedded?: boolean
}

const getElementHeight = (id: string) => {
  const div = document.getElementById(id)

  return div?.clientHeight
}

export function EventComponent(props: Props) {
  const currentStage = useStage()
  const { timeState, currentSession, eventDayNum, sessions, setFilters } = useSessions()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContentType, setModalContentType] = useState<string | null>(null)
  const [speaker, setSpeaker] = useState<Speaker | undefined>(undefined)
  const [sidebarHeight, setSidebarHeight] = useState<string>('auto')

  const playerDivHeight = getElementHeight('playerContainer')
  const infoBoxHeight = getElementHeight('infoBox')
  const sidebar = document.getElementById('sidebar')

  useEffect(() => {
    setFilters([
      { type: 'stage', value: currentStage.name },
      { type: 'day', value: eventDayNum },
    ])
  }, [currentStage, eventDayNum, setFilters])

  useEffect(() => {
    if (sidebar && playerDivHeight && infoBoxHeight) {
      setSidebarHeight(playerDivHeight + infoBoxHeight + 10 + 'px')
    }
  }, [playerDivHeight, infoBoxHeight, sidebar])

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

  if (props.embedded) {
    return (
      <div className={styles.player}>
        <Player source={activeSource} onStreamError={onStreamError} />
      </div>
    )
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
          <div id="playerContainer" className={styles.player}>
            <Player source={activeSource} onStreamError={onStreamError} />
          </div>
          <div className={styles.sidebar}>
            <Sidebar timeState={timeState} sessions={sessions} currentSession={currentSession} isLive={!!activeSource} height={sidebarHeight} />
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
