import Link from 'next/link'
import { useRouter } from 'next/router'
import { Event } from 'types'

interface EventSwitcherProps {
  events: Event[]
}

export default function EventSwitcher({ events }: EventSwitcherProps) {
  const router = useRouter()
  const { pathname, asPath } = router
  const isEmbedPath = pathname === '/event/[id]/embed'

  const href = (eventId: string) => {
    let path = `/event/${eventId}`

    if (isEmbedPath) {
      path += '/embed'
    }

    return path
  }

  return (
    <div className="event__switcher">
      <div className="event__switcher__title">Select event stream</div>
      <div className="event__switcher__scroll">
        <ul className="event__switcher__events">
          {events.map(event => {
            return (
              <li
                key={event.id}
                className={`event__switcher__events__event ${asPath.includes(event.id) ? 'active' : ''}`}
              >
                <Link href={href(event.id)}>{event.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
