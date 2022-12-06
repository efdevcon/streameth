import { GetStaticProps } from 'next'
import { GetEvents } from 'services/event'
import { Event } from 'types'
import Link from 'next/link'
import Image from 'next/image'
import css from './index.module.scss'
import moment from 'moment'
import { LivePulse } from 'components/LivePulse'
import { getStreams } from 'services/stream'
import { useEffect, useState } from 'react'
import { GetDomainName } from 'utils/format'

interface Props {
  events: Event[]
}

const eventStreamIds = (event: Event) => {
  return event.rooms?.length > 0 ? event.rooms.map(room => room.streams.map(stream => stream.id)).flat() : []
}

export default function Home(props: Props) {
  const [activeStreamIds, setActiveStreamIds] = useState<string[]>([])

  useEffect(() => {
    const getActiveStreams = async () => {
      // collect all stream ids
      const streamIds = props.events.map(event => eventStreamIds(event)).flat()
      const allStreams = await getStreams(streamIds)
      const activeIds = allStreams.filter(stream => stream.isActive).map(stream => stream.id)

      setActiveStreamIds(activeIds)
    }

    getActiveStreams()
  }, [])

  const dates = [...new Set(props.events.map(i => i.start).concat(props.events.map(i => i.end)))].sort()

  return dates.map(date => {
    const dateHasPassed = moment(date).isBefore(moment())
    const eventDate = new Date(date).getDate()

    return (
      <div key={date} className={css.container}>
        <h3>
          {moment(date).format('MMM DD')} {eventDate >= 18 && <small>day {eventDate - 17}</small>}
        </h3>

        <section>
          {props.events
            .filter(event => event.start === date || event.end === date)
            .map((event: Event) => {
              // check if any of the event's stream ids are present within the active stream ids
              const eventIsStreaming = eventStreamIds(event).some(el => activeStreamIds.includes(el))

              let className = css.event
              if (dateHasPassed) className += ` ${css.passed}`

              return (
                <Link key={`event_${event.id}`} href={`event/${event.id}`}>
                  <article className={className}>
                    <div className={css.poster}>
                      <Image
                        src={event.poster ?? '/posters/default.png'}
                        alt={event.name}
                        objectFit="cover"
                        layout="fill"
                      />
                    </div>
                    <div className={css.info}>
                      <div className={css.title}>
                        <h4>{event.name}</h4>
                        {eventIsStreaming && <LivePulse style={{ marginLeft: '8px' }} />}
                      </div>
                      <p className={css.description}>{event.description}</p>
                      <span className={css.domain}>{GetDomainName(event.website)}</span>
                    </div>
                  </article>
                </Link>
              )
            })}
        </section>
      </div>
    )
  })
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = GetEvents().filter(i => i.id !== 'test')

  return {
    props: {
      events,
    },
  }
}