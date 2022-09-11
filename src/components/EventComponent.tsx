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
import { useRelativeTime } from 'hooks/useRelativeTime'

const currentDate = moment()

export function EventComponent() {
  const event = useEvent()
  const currentStage = useStage()
  const { timeState, currentSession, eventDayNum } = useRelativeTime(event)
  console.log(timeState, currentSession, eventDayNum)
  // const eventDays = [...new Set(event.schedule.sessions.map((i) => moment(i.start).startOf('day').valueOf()))].sort()
  const upcomingSessions = event.schedule.sessions
    .filter((i) => i.stage === currentStage.name)
    // filter on event days
    // .filter(i => moment(i.start).startOf('day').valueOf()
    //   === eventDays.find(i => i === moment().startOf('day').valueOf()) ?? eventDays[0])
    .sort((a: any, b: any) => a.start - b.start)
  const { activeSource, onStreamError } = useLivestream(currentStage?.stream)
  // TODO: get active session
  const session = upcomingSessions[0]
  console.log(session)
  return (
    <div>
      <Container>
        <div className={styles.widget}>
          <div className={styles.header}>
            <EventHeader title={session.name} showLive={true} />
          </div>
          <div className={styles.player}>
            <Player source={activeSource} onStreamError={onStreamError} />
          </div>
          <div className={styles.sidebar}>
            <StageSelector />
            <h3 className="text-2xl font-bold">Schedule</h3>
            <ul>
              {upcomingSessions.map((i) => {
                return (
                  <li key={i.id} className="mb-3 text-lg">
                    <SessionSnack session={i} />
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={styles.eventInfo}>
            <SessionInfoBox session={session} />
          </div>
        </div>
      </Container>
    </div>
  )
}
