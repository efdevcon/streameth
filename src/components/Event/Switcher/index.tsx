import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
import { Event } from 'types'

interface EventSwitcherProps {
  events: Event[]
}

export default function EventSwitcher({ events }: EventSwitcherProps) {
  const router = useRouter()
  const {
    pathname,
    query: { id },
  } = router

  const href = (eventId: string) => {
    return pathname.replace('[id]', eventId)
  }

  const activeEvents = () => {
    const today = moment().format('YYYY-MM-DD')

    return events.filter(event => (today >= event.start && today <= event.end) || id === event.id)
  }

  return (
    <div className="event__switcher">
      <div className="event__switcher__title">Select event stream</div>
      <div className="event__switcher__scroll">
        <ul className="event__switcher__events">
          {activeEvents().map(event => {
            return (
              <li key={event.id} className={`event__switcher__events__event ${id === event.id ? 'active' : ''}`}>
                <Link href={href(event.id)}>{event.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
