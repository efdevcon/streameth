import React, { useEffect, useState, ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { Event, Stream } from 'types'
import { GetEventNames, GetEvents } from 'services/event'
import { getStream } from 'services/stream'
import { EmbedLayout } from 'layouts'
import Schedule from 'components/Schedule'
import Player from 'components/Player'
import PlayerHeader from 'components/Player/Header'
import PlayerStatus from 'components/Player/Status'

interface Props {
  event: Event
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function EmbedEventPage(props: Props) {
  const [stream, setStream] = useState<Stream | null>(null)
  const [currentStreamId, setCurrentStreamId] = useState<string | null>(props.event.rooms[0]?.streams[0].id)

  useEffect(() => {
    const fetchStream = async (streamId: string) => {
      const fetchedStream = await getStream(streamId)

      setStream(fetchedStream)
    }

    if (currentStreamId) {
      fetchStream(currentStreamId)
    }
  }, [currentStreamId])

  return (
    <div className="player-wrapper">
      <PlayerHeader />
      <PlayerStatus />
      <Player />
      <Schedule sessions={props.event.schedule.sessions} />
    </div>
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
    },
  }
}
