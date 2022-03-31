import React, { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { Event, Stream } from 'types'
import { GetEventNames, GetEvents } from 'services/event'
import { getStream } from 'services/stream'
import Schedule from 'components/Schedule'

import Player from 'components/Player'
interface Props {
  event: Event
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function EventPage(props: Props) {
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
    <>
      <div>
        <div className="section">
          <div className="content">
            <h2>{props.event.name}</h2>
            <p>{props.event.description}</p>
            <div className="player-wrapper">
              <Player />
              <Schedule sessions={props.event.schedule.sessions} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

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
