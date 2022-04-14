import { useState, useEffect } from 'react'
import useInterval from '@use-it/interval'
import { Room, Stream, Event } from 'types'
import { getStreams } from 'services/stream'

const POLLING_INTERVAL_MS = 1000 * 10

const useStreams = (event: Event) => {
  const [currentRoom, setCurrentRoom] = useState<Room>(event.rooms[0])
  const [streams, setStreams] = useState<Stream[]>([])
  const [currentStream, setCurrentStream] = useState<Stream | null>(streams[0])
  const [streamsLoading, setStreamsLoading] = useState(true)
  const [currentStreamIndex, setCurrentStreamIndex] = useState<number>(0)
  const [isPolling, setIsPolling] = useState<boolean>(false)

  useEffect(() => {
    const rooms = event?.rooms || []

    setCurrentRoom(rooms[0])
  }, [event])

  useEffect(() => {
    if (currentRoom) {
      fetchStreams()
    }
  }, [currentRoom])

  // Poll for new streams
  useInterval(async () => {
    if (isPolling && currentRoom) {
      await fetchStreams()
    }
  }, POLLING_INTERVAL_MS)

  // Determine if polling is necessary
  // If any streams currently active, disable polling
  // If any recordings present (live stream is over), disable polling
  useEffect(() => {
    const activeStreamIndex = streams.findIndex(stream => stream.isActive)
    const recordedStreams = streams.filter(stream => stream.recordings.length > 0)
    if (activeStreamIndex > -1) {
      setIsPolling(false)
      setCurrentStream(streams[activeStreamIndex])
      // } else if (recordedStreams.length > 0) {
      // setIsPolling(false)
      // setCurrentStream(recordedStreams[0])
    } else {
      setCurrentStream(null)
      setIsPolling(true)
    }
  }, [streams])

  const fetchStreams = async () => {
    setStreamsLoading(true)

    try {
      const streams = await getStreams(currentRoom.streams.map(stream => stream.id))
      setStreams(streams)
    } catch (e) {
      console.error(e)
    } finally {
      setStreamsLoading(false)
    }
  }

  const changeStream = () => {
    fetchStreams()
  }


  const changeRoom = (roomId: string) => {
    const room = event.rooms.find(room => room.id === roomId)

    if (room) {
      setCurrentRoom(room)
    }
  }

  const mediaUrl = () => {
    if (currentStream) {
      if (currentStream.isActive) {
        return currentStream.playbackUrl
      }

      // if (currentStream.recordings) {
      //   return currentStream.recordings[0].recordingUrl
      // }
    }

    return null
  }

  return {
    streamsLoading,
    streams,
    currentStream,
    changeStream,
    currentRoom,
    changeRoom,
    mediaUrl,
  }
}

export default useStreams
