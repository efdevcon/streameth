import { useState, useEffect } from 'react'
import { Room, Stream, Event } from 'types'
import { getStreams } from 'services/stream'

const useStreams = (event: Event, events: Event[]) => {
  const [currentEvent, setCurrentEvent] = useState<Event>(event)
  const [currentRoom, setCurrentRoom] = useState<Room>(event.rooms[0])
  const [streams, setStreams] = useState<Stream[]>([])
  const [streamsLoading, setStreamsLoading] = useState(true)
  const [currentStreamIndex, setCurrentStreamIndex] = useState<number>(0)

  useEffect(() => {
    const rooms = currentEvent?.rooms || []

    setCurrentRoom(rooms[0])
  }, [currentEvent])

  useEffect(() => {
    const getRoomStreams = async (room: Room) => {
      try {
        const streams = await getStreams(room.streams.map(stream => stream.id))
        setStreams(streams)
      } catch (e) {
        console.error(e)
      } finally {
        setStreamsLoading(false)
      }
    }

    if (currentRoom) {
      getRoomStreams(currentRoom)
    }
  }, [currentRoom])

  const updateCurrentStream = (index: number) => {
    setCurrentStreamIndex(index)
  }

  const currentStream = () => {
    return streams[currentStreamIndex]
  }

  const eventNames = () => {
    return events.map(event => event.name)
  }

  const changeEvent = (eventName: string) => {
    const event = events.find(event => event.name === eventName)

    if (event) {
      setCurrentEvent(event)
    }
  }

  return {
    streamsLoading,
    streams,
    updateCurrentStream,
    currentStream,
    eventNames,
    changeEvent,
    currentEvent,
  }
}

export default useStreams
