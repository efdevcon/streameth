import { Session } from 'types'
import ScheduleSession from './Session'

interface ScheduleProps {
  sessions: Session[]
}

export default function Schedule({ sessions }: ScheduleProps) {
  return (
    <div>
      <p className="schedule__title">Schedule</p>
      <ul className="schedule__sessions">
        {sessions.map(session => {
          return (
            <li key={session.id}>
              <ScheduleSession session={session} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
