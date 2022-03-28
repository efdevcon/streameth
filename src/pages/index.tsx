import { GetStaticProps } from 'next'
import { GetEvents } from 'services/event'
import { Event, Stream } from 'types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getStreams } from '../services/stream'

interface Props {
  events: Event[]
}

export default function Home(props: Props) {
  const [streams, setStreams] = useState<Stream[]>([])

  useEffect(() => {
    const fetchStreams = async () => {
      const fetchedStreams = await getStreams()

      setStreams(fetchedStreams)
    }

    fetchStreams()
  }, [])

  return (
    <section>
      <ul>
        {props.events.map((event: Event) => {
          return (
            <li key={event.id}>
              <Link href={`event/${event.id}`}>{event.name}</Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = GetEvents()

  return {
    props: {
      events,
    },
  }
}
