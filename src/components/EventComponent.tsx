import { useEvent } from 'hooks/useEvent'
import { useStage } from 'hooks/useStage'
import moment from 'moment'
import Link from 'next/link'
import Container from 'components/Container'
import styles from './EventComponent.module.scss'

export function TestEventComponent() {
  const event = useEvent()
  const stage = useStage()

  return (
    <div>
      <br />
      <section>
        Active stage: <b>{stage.id}</b>
      </section>
      <br />

      <section>
        <h2 className="text-3xl font-bold underline">{event.name}</h2>
        <p>
          {moment(event.start).format('MMM DD')} - {moment(event.end).format('MMM DD')}
        </p>
      </section>
      <br />

      <section>
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
      </section>
      <br />

      <Container>
        <div className={styles.widget}>
          <div className={styles.header}>Header</div>
          <div className={styles.player}>Player</div>
          <div className={styles.sidebar}>Sidebar</div>
          <div className={styles.eventInfo}>Event Info</div>
        </div>
      </Container>

      <section>
        <h3 className="text-2xl font-bold">Schedule</h3>
        <ul>
          {event.schedule.sessions
            .sort((a, b) => a.start - b.start)
            .map((i) => {
              return (
                <li key={i.id}>
                  {moment(i.start).format('DD MMM - HH:mm')} {i.name}
                </li>
              )
            })}
        </ul>
      </section>
    </div>
  )
}
