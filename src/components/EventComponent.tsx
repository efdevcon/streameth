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

const getElementHeight = (document: Document, id: string) => {
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
  const [streamType, setStreamType] = useState<'livepeer' | 'youtube'>('livepeer')

  useEffect(() => {
    setFilters([
      { type: 'stage', value: currentStage.name },
      { type: 'day', value: eventDayNum },
    ])
  }, [currentStage, eventDayNum, setFilters])

  useEffect(() => {
    const playerDivHeight = getElementHeight(document, 'playerContainer') || 0
    const infoBoxHeight = getElementHeight(document, 'infoBox') || 0

    setSidebarHeight(playerDivHeight + infoBoxHeight + 10 + 'px')
  }, [])

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
      <div style={{ width: '100vw', height: '100vh' }}>
        <Player source={activeSource} onStreamError={onStreamError} embedded />
        {/* <iframe
          src={currentStage.youtube}
          width="100%"
          height="100%"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        /> */}
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
            {streamType === 'livepeer' &&
              <Player source={activeSource} onStreamError={onStreamError} />
            }
            {streamType === 'youtube' &&
              <iframe
                src={currentStage.youtube}
                width="100%"
                height="100%"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            }
          </div>
          <div className={styles.sidebar}>
            <Sidebar timeState={timeState} sessions={sessions} currentSession={currentSession} isLive={false} height={sidebarHeight} />
          </div>
          <div className={styles.eventInfo}>
            <ul className={styles.tabs}>
              <li className='mr-2' onClick={() => setStreamType('livepeer')}>
                <a href='#' className={streamType === 'livepeer' ? styles.active : ''}>Livepeer</a>
              </li>
              <li className='mr-2' onClick={() => setStreamType('youtube')}>
                <a href='#' className={streamType === 'youtube' ? styles.active : ''}>YouTube</a>
              </li>
            </ul>
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
