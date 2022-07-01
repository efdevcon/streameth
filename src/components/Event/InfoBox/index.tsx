import { Event, Session } from 'types'
import EventDate from 'components/Event/Date'
import { GetDomainName } from 'utils/format'
import Link from 'next/link'

interface EventInfoBoxProps {
  event: Event
}

const firstSessionStartTime = (sessions: Session[]) => {
  const firstSession = sessions && sessions.length > 0 ? sessions[0] : undefined
  if (firstSession) {
    return firstSession.start
  }

  return ''
}

const lastSessionEndTime = (sessions: Session[]) => {
  const lastSession = sessions && sessions.length > 0 ? sessions[sessions.length - 1] : undefined
  if (lastSession) {
    return lastSession.end
  }

  return ''
}

export default function EventInfoBox({ event }: EventInfoBoxProps) {
  return (
    <>
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
          <p style={{
            fontSize: '12px',
            marginTop: '16px',
            textTransform: 'uppercase',
            color: 'darkgray'
          }}>
            <Link href={event.website} passHref>
              <a href={event.website} target="_blank" rel="noopener noreferrer">
                {GetDomainName(event.website)}
              </a>
            </Link>
          </p>
        </div>
      </div>
      {event.archive.type === 'ipfs' && (
        <div className="event__ipfs-box">
          <strong><i className="bi bi-box" /></strong>
          <span>This (experimental) video archive is stored on <Link href={`https://ipfs.io/ipfs/${event.archive.config.directory}`}>IPFS</Link>.</span>
        </div>
      )}
      {event.youtube?.url && (
        <div className="event__youtube-box">
          <i className="bi bi-youtube" />
          <span>For a better view experience you can watch these videos on <Link href={event.youtube.url}>YouTube</Link></span>
        </div>
      )}
    </>
  )
}
