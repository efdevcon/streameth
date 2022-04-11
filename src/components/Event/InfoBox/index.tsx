import { Event, Session } from 'types'
import EventDate from 'components/Event/Date'

interface EventInfoBoxProps {
  event: Event
}

const firstSessionStartTime = (sessions: Session[]) => {
  const firstSession = sessions[0]

  if (firstSession) {
    return firstSession.start
  }

  return ''
}

const lastSessionEndTime = (sessions: Session[]) => {
  const lastSession = sessions[sessions.length - 1]

  if (lastSession) {
    return lastSession.end
  }

  return ''
}

export default function EventInfoBox({ event }: EventInfoBoxProps) {
  return (
    <div className="event__info-box">
      <div className="event__info-box__date" style={{ textAlign: 'left' }}>
        <EventDate
          startDate={event.start}
          endDate={event.end}
          startTime={firstSessionStartTime(event.schedule.sessions)}
          endTime={lastSessionEndTime(event.schedule.sessions)}
        />
      </div>
      <div className="event__info-box__details">
        <h2>{event.name}</h2>
        <p>{event.description}</p>
      </div>
    </div>
  )
}
