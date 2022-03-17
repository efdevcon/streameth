import { GetStaticProps } from 'next'
import { GetEvents } from 'services/event'
import { Event } from 'types'
import { DEFAULT_REVALIDATE_PERIOD, DESCRIPTION, TITLE } from 'utils/constants'
import Link from 'next/link'

interface Props {
  events: Array<Event>
}

export default function Home(props: Props) {
  return (
    <section>
      <ul>
        {props.events.map((event: Event) => {
          return <li key={event.id}>
            <Link href={event.id}>{event.name}</Link>
          </li>
        })}
      </ul>
    </section>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = GetEvents()

  return {
    props: {
      events
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}