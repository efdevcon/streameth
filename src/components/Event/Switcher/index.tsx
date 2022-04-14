import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
import { Event } from 'types'
import { getStaticProps } from 'pages'

interface EventSwitcherProps {
  current?: Event
  events: Event[]
}

export default function EventSwitcher({ current, events }: EventSwitcherProps) {
  const router = useRouter()
  const {
    pathname,
    query: { id },
  } = router

  const href = (eventId: string) => {
    return pathname.replace('[id]', eventId)
  }

  const activeEvents = () => {
    if (!current) {
      const today = moment()
      const active = events.filter(i => id === i.id ||
        (moment(i.start).isSame(today, 'day') || moment(i.end).isSame(today, 'day')))
      return active
    }

    const active = events.filter(i => id === i.id ||
      (moment(i.start).isSame(moment(current.start), 'day') || moment(i.end).isSame(current.end, 'day')))
    return active
  }

  return (
    <div className="event__switcher">
      <div className="event__switcher__title">Select event stream</div>
      <div className="event__switcher__scroll">
        <ul className="event__switcher__events">
          {activeEvents().map(event => {
            return (
              <li key={`active_events_${event.id}`} className={`event__switcher__events__event ${id === event.id ? 'active' : ''}`}>
                <Link href={href(event.id)}>{event.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
