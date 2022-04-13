import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Event } from 'types'
import { GetEventNames, GetEvents } from 'services/event'
import { EmbedLayout } from 'layouts'
import Widget from 'components/Widget'
import { SEO } from 'components/seo'

interface Props {
  event: Event
  events: Event[]
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function EmbedEventPage(props: Props) {
  return <>
    <SEO title={props.event.name} description={props.event.description} imageUrl={props.event.poster} />
    <Widget allEvents={props.events} event={props.event} />
  </>
}

EmbedEventPage.layout = EmbedLayout

export const getStaticPaths: GetStaticPaths = async () => {
  const events = GetEventNames()

  return {
    paths: events.map(i => {
      return { params: { id: i } }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async context => {
  const events = GetEvents()
  const event = events.find(i => i.id === context.params?.id)

  if (!event) {
    return {
      props: null,
      notFound: true,
    }
  }

  return {
    props: {
      event,
      events,
    },
  }
}
