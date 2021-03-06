import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Event } from 'types'
import { GetEventNames, GetEvents } from 'services/event'
import { EmbedLayout } from 'layouts'
import { SEO } from 'components/seo'
import Player from 'components/Player'
import useStreams from 'components/Hooks/useStreams'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
  event: Event
  events: Event[]
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function EmbedEventPage(props: Props) {
  const { mediaUrl, changeRoom, changeStream } = useStreams(props.event)
  const router = useRouter()
  const { room } = router.query

  useEffect(() => {
    if (room) {
      console.log('Changing room to', room)
      changeRoom(room as string)
    }
  }, [room])

  return (
    <>
      <SEO title={props.event.name} description={props.event.description} imageUrl={props.event.poster} />
      <Player eventName={props.event.name} src={mediaUrl} poster={props.event.poster} onStreamError={changeStream} />
    </>
  )
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
