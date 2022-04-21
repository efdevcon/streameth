import { Session } from 'types'
import ScheduleSession from './Session'

interface ScheduleProps {
  sessions: Session[]
}

export default function Schedule({ sessions }: ScheduleProps) {
  if (sessions.length === 0) {
    return null
  }

  return (
    <div>
      <p className="schedule__title">Schedule</p>
      <ul className="schedule__sessions">
        {sessions
          .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
          .map(session => {
            return (
              <li key={`schedule_sessions_${session.id}`}>
                <ScheduleSession session={session} />
              </li>
            )
          })}
      </ul>
    </div>
  )
}
