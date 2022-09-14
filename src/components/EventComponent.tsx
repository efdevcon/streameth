import { useEffect, useState } from 'react'
import { useEvent } from 'hooks/useEvent'
import { useStage } from 'hooks/useStage'
import useLivestream from 'hooks/useLivestream'
import moment from 'moment'
import Container from 'components/Container'
import EventHeader from './Event/Header'
import SessionInfoBox from './Session/Infobox'
import styles from './EventComponent.module.scss'
import { StageSelector } from './StageSelector'
import Link from 'next/link'
import Player from './Player'
import SessionSnack from './Session/Snack'
import { useSessions } from 'hooks/useSessions'
import Modal from './Modal'
import { ShareBox } from './Share/Box'
import { Speaker } from 'types'

const openModal = () => {}

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

  // const { sessions } = useSessions(event, [{ type: 'stage', value: currentStage.name }])
  // console.log(timeState, currentSession, eventDayNum)
  // const eventDays = [...new Set(event.schedule.sessions.map((i) => moment(i.start).startOf('day').valueOf()))].sort()
  // const upcomingSessions = event.schedule.sessions
  //   .filter((i) => i.stage === currentStage.name)
  //   // filter on event days
  //   // .filter(i => moment(i.start).startOf('day').valueOf()
  //   //   === eventDays.find(i => i === moment().startOf('day').valueOf()) ?? eventDays[0])
  //   .sort((a: any, b: any) => a.start - b.start)
  const { activeSource, onStreamError } = useLivestream(currentStage?.stream.map((i) => i.id) ?? [])
  // TODO: get active session
  // const session = upcomingSessions[0]
  // console.log(session)

  const openModal = (type: 'share' | 'speaker', speaker?: Speaker) => {
    setModalContentType(type)
    setSpeaker(speaker)
    setModalOpen(true)
  }

  const modalContent = () => {
    if (modalContentType === 'share') {
      return <ShareBox title={currentSession.name} />
    } else if (modalContentType === 'speaker') {
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
            <StageSelector />
            <h3 className="text-2xl font-bold">Schedule</h3>
            <ul>
              {sessions.map((i) => {
                return (
                  <li key={i.id} className="mb-3 text-lg">
                    <SessionSnack session={i} />
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={styles.eventInfo}>
            <SessionInfoBox session={currentSession} onShareClick={() => openModal('share')} />
          </div>
        </div>
      </Container>
    </div>
  )
}
