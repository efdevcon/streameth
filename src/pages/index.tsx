import { GetStaticProps } from 'next'
import { GetEvents } from 'services/event'
import { Event } from 'types'
import Link from 'next/link'
import Image from 'next/image'
import css from './index.module.scss'
import moment from 'moment'
import { LivePulse } from 'components/LivePulse'

interface Props {
  events: Event[]
}

export function GetDomainName(url: string): string {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[\/?#]/)[0]
}

export default function Home(props: Props) {
  const dates = [...new Set(props.events.map(i => i.start).concat(props.events.map(i => i.end)))].sort()

  return dates.map(date => {
    const dateHasPassed = moment(date).isBefore(moment())
    const eventDate = new Date(date).getDate()

    return <div key={date} className={css.container}>
      <h3>{moment(date).format('MMM DD')} {eventDate >= 18 && <small>day {eventDate - 17}</small>}</h3>

      <section>
        {props.events.filter(event => event.start === date || event.end === date).map((event: Event) => {
          const eventIsStreaming = false // can we get this at this point?
          let className = css.event
          if (dateHasPassed) className += ` ${css.passed}`

          return (
            <Link key={`event_${event.id}`} href={`event/${event.id}`}>
              <article className={className}>
                <div className={css.poster}>
                  <Image src={event.poster ?? '/posters/default.png'} alt={event.name} objectFit='cover' layout='fill' />
                </div>
                <div className={css.info}>
                  <div className={css.title}>
                    <h4>{event.name}</h4>
                    {eventIsStreaming && <LivePulse style={{ marginLeft: '8px'}} />}
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
