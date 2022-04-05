import { useState, useEffect } from 'react'
import { Room, Stream, Event } from 'types'
import { getStreams } from 'services/stream'

const useStreams = (event: Event) => {
  const [currentRoom, setCurrentRoom] = useState<Room>(event.rooms[0])
  const [streams, setStreams] = useState<Stream[]>([])
  const [streamsLoading, setStreamsLoading] = useState(true)
  const [currentStreamIndex, setCurrentStreamIndex] = useState<number>(0)

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

  return { streamsLoading, streams, updateCurrentStream, currentStream }
}

export default useStreams
