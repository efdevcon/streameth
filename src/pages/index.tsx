import { GetStaticProps } from 'next'
import { GetEvents } from 'services/event'
import { Event } from 'types'
import Link from 'next/link'
import Image from 'next/image'
import css from './index.module.scss'
import moment from 'moment'

interface Props {
  events: Event[]
}

export function GetDomainName(url: string): string {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[\/?#]/)[0]
}

export default function Home(props: Props) {
  const dates = [...new Set(props.events.map(i => i.start).concat(props.events.map(i => i.end)))].sort()

  return dates.map(date => {
    const eventDate = new Date(date).getDate()
    return <div className={css.container}>
      <h3>{moment(date).format('MMM DD')} {eventDate >= 18 && <small>day {eventDate - 17}</small>}</h3>

      <section>
        {props.events.filter(event => event.start === date || event.end === date).map((event: Event) => {
          return (
            <Link key={event.id} href={`event/${event.id}`}>
              <article className={css.event}>
                <div className={css.poster}>
                  <Image src={event.poster ?? '/default-poster.png'} alt={event.name} objectFit='cover' layout='fill' />
                </div>
                <div className={css.info}>
                  <h4>{event.name}</h4>
                  <p className={css.description}>{event.description}</p>
                  <span className={css.domain}>{GetDomainName(event.website)}</span>
                </div>
              </article>
            </Link>
          )
        })}
      </section>
    </div>
  })
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = GetEvents()

  return {
    props: {
      events,
    },
  }
}
