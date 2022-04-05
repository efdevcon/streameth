import React, { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { Event, Stream, Room } from 'types'
import { GetEventNames, GetEvents } from 'services/event'
import { getStreams } from 'services/stream'
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

export default function EventPage(props: Props) {
  const [currentRoom, setCurrentRoom] = useState<Room>(props.event.rooms[0])
  const [streams, setStreams] = useState<Stream[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getRoomStreams = async (room: Room) => {
      try {
        const streams = await getStreams(room.streams.map(stream => stream.id))

        setStreams(streams)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }

    if (currentRoom) {
      getRoomStreams(currentRoom)
    }
  }, [currentRoom])

  return (
    <>
      <div>
        <div className="section">
          <div className="content">
            <h2>{props.event.name}</h2>
            <p>{props.event.description}</p>
            <div style={{ marginTop: '30px' }}>
              <div className="player-wrapper">
                <PlayerHeader />
                <PlayerStatus />
                <Player streams={streams} poster={props.event.poster} isLoading={isLoading} />
                <Schedule sessions={props.event.schedule.sessions} />
              </div>
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
