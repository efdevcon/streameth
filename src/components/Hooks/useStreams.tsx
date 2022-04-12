import { useState, useEffect } from 'react'
import useInterval from '@use-it/interval'
import { Room, Stream, Event } from 'types'
import { getStreams } from 'services/stream'

const POLLING_INTERVAL_MS = 1000 * 60

const useStreams = (event: Event, events: Event[]) => {
  const [currentEvent, setCurrentEvent] = useState<Event>(event)
  const [currentRoom, setCurrentRoom] = useState<Room>(event.rooms[0])
  const [streams, setStreams] = useState<Stream[]>([])
  const [currentStream, setCurrentStream] = useState<Stream>(streams[0])
  const [streamsLoading, setStreamsLoading] = useState(true)
  const [currentStreamIndex, setCurrentStreamIndex] = useState<number>(0)
  const [isPolling, setIsPolling] = useState<boolean>(false)

  useEffect(() => {
    const rooms = currentEvent?.rooms || []

    setCurrentRoom(rooms[0])
  }, [currentEvent])

  // Poll for new streams
  useInterval(async () => {
    if (isPolling && currentRoom) {
      setStreamsLoading(true)

      try {
        const streams = await getStreams(currentRoom.streams.map(stream => stream.id))

        setCurrentStreamIndex(0)
        setStreams(streams)
      } catch (e) {
        console.error(e)
      } finally {
        setStreamsLoading(false)
      }
    }
  }, POLLING_INTERVAL_MS)

  // Determine if polling is necessary
  // If any streams currently active, disable polling
  // If any recordings present (live stream is over), disable polling
  useEffect(() => {
    const activeStreams = streams.filter(stream => stream.isActive)
    const recordedStreams = streams.filter(stream => stream.recordings.length > 0)

    if (activeStreams.length > 0) {
      setIsPolling(false)
      setCurrentStream(activeStreams[0])
    } else if (recordedStreams.length > 0) {
      setIsPolling(false)
      setCurrentStream(recordedStreams[0])
    } else {
      setIsPolling(true)
    }
  }, [streams])

  const eventNames = () => {
    return events.map(event => event.name)
  }

  const changeEvent = (eventName: string) => {
    const event = events.find(event => event.name === eventName)

    if (event) {
      setCurrentEvent(event)
    }
  }

  const changeStream = () => {
    let newStreamIndex = currentStreamIndex + 1

    // Check array bounds; if out of bounds, set currentStreamIndex to 0
    if (!streams[newStreamIndex]) {
      newStreamIndex = 0
    }

    setCurrentStreamIndex(newStreamIndex)
    setCurrentStream(streams[newStreamIndex])
  }

  const mediaUrl = () => {
    if (currentStream) {
      if (currentStream.isActive) {
        return currentStream.playbackUrl
      }

      if (currentStream.recordings) {
        return currentStream.recordings[0].recordingUrl
      }
    }

    return null
  }

  return {
    streamsLoading,
    streams,
    currentStream,
    eventNames,
    changeEvent,
    currentEvent,
    changeStream,
    mediaUrl,
  }
}

export default useStreams
