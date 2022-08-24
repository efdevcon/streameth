import { useEvent } from 'hooks/useEvent'
import { useStage } from 'hooks/useStage'
import useLivestream from 'hooks/useLivestream'
import moment from 'moment'
import type { Session } from 'types'
import Container from 'components/Container'
import EventHeader from './Event/Header'
import SessionInfoBox from './Session/Infobox'
import styles from './EventComponent.module.scss'
import Player from './Player'
export function TestEventComponent() {
  const event = useEvent()
  const stage = useStage()
  const { activeSource, onStreamError } = useLivestream(stage?.stream)
  // TODO: get active session
  const session = event.schedule.sessions[0]

  return (
    <div>
      {/* <section>
        <h3 className="text-2xl font-bold">Stages</h3>
        <ul>
          {event.stream.stages.map((i) => {
            return (
              <li key={i.id} className="underline">
                <Link href={`/stage/${i.id}`}>{i.id}</Link>
              </li>
            )
          })}
        </ul>
      </section> */}
      <Container>
        <div className={styles.widget}>
          <div className={styles.header}>
            <EventHeader title={session.name} showLive={true} />
          </div>
          <Player source={activeSource} onStreamError={onStreamError} />
          <div className={styles.sidebar}>
            <h3 className="text-2xl font-bold">Schedule</h3>
            <ul>
              {event.schedule.sessions
                .sort((a: any, b: any) => a.start - b.start)
                .map((i) => {
                  return (
                    <li key={i.id}>
                      {moment(i.start).format('DD MMM - HH:mm')} {i.name}
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
