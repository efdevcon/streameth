import { useState, useEffect } from 'react'
import useInterval from '@use-it/interval'
import moment from 'moment'
import { Room, Stream, Event } from 'types'
import { getStreams } from 'services/stream'

const POLLING_INTERVAL_MS = 1000 * 10

const useStreams = (event: Event) => {
  const [currentRoom, setCurrentRoom] = useState<Room>(event.rooms[0])
  const [streams, setStreams] = useState<Stream[]>([])
  const [currentStream, setCurrentStream] = useState<Stream | null>(streams[0])
  const [streamsLoading, setStreamsLoading] = useState(true)
  const [currentStreamIndex, setCurrentStreamIndex] = useState<number>(0)
  const [currentRecordingIndex, setCurrentRecordingIndex] = useState<number | null>(null)
  const [isPolling, setIsPolling] = useState<boolean>(false)

  // Determines if event is finished by checking if:
  // (1) 2 hours have passed since last session end time or
  // (2) Recordings present for events with no sessions
  const isEventOver = () => {
    const sessions = event.schedule.sessions

    if (sessions.length > 0) {
      const lastSession = sessions[sessions.length - 1]
      const today = moment().utc()
      const lastSessionEnd = moment.utc(lastSession.end)

      if (today.diff(lastSessionEnd, 'hours') > 2) {
        return true
      }
    } else if (event.recordings.length > 0) {
      return true
    }

    return false
  }

  // set default room on event change
  useEffect(() => {
    const rooms = event?.rooms || []

    setCurrentRoom(rooms[0])
  }, [event])

  // fetch streams on room change
  useEffect(() => {
    if (currentRoom && !isEventOver()) {
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
  // If livestream is over, disable polling
  // If any streams currently active, disable polling
  useEffect(() => {
    const activeStreamIndex = streams.findIndex(stream => stream.isActive)

    if (isEventOver()) {
      setIsPolling(false)
    } else if (activeStreamIndex > -1) {
      setIsPolling(false)
      setCurrentStream(streams[activeStreamIndex])
    } else {
      // setCurrentStream(null)
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
    let newStreamIndex = currentStreamIndex + 1

    // Check array bounds; if out of bounds, set currentStreamIndex to 0
    if (!streams[newStreamIndex]) {
      newStreamIndex = 0
    }

    setCurrentStreamIndex(newStreamIndex)
    setCurrentStream(streams[newStreamIndex])
  }

  const changeRecording = (index: number | null) => {
    setCurrentRecordingIndex(index)
  }

  const changeRoom = (roomId: string) => {
    const room = event.rooms.find(room => room.id === roomId)

    if (room) {
      setCurrentRoom(room)
    }
  }

  const mediaUrl = () => {
    if (currentRecordingIndex) {
      return event.recordings[currentRecordingIndex].recordingUrl
    }

    if (currentStream && currentStream.isActive) {
      return currentStream.playbackUrl
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
    changeRecording,
    mediaUrl,
    currentRecordingIndex,
  }
}

export default useStreams
