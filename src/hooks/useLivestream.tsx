import { useState, useEffect } from 'react'
import { Stage, streamItem } from 'types'
import { Source } from 'components/Player/types'
import { getStreams } from 'services/stream'

const useLiveStream = (streamIds: string[]) => {
  const [streams, setStreams] = useState<streamItem[]>([])
  const [activeStream, setActiveStream] = useState<streamItem | null>(null)

  const fetchStreams = async () => {
    getStreams(streamIds)
      .then((res) => {
        const activeSources = res.filter((i) => i.isActive)
        setStreams(activeSources)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (streamIds.length > 0) {
      fetchStreams()
      setInterval(() => {
        fetchStreams()
      }
      , 10000)
    }
  }, [])

  useEffect(() => {
    if (streams.length > 0 && activeStream === null) {
      setActiveStream(streams[0])
    }
  }, [streams, activeStream])




  const onStreamError = () => {
    console.log("onStreamError")
    if (activeStream == null) return
    const activeStreams = streams.filter((i) => i.id !== activeStream.id)

    setStreams([...activeStreams])
    if (activeStreams.length > 0) {
      setActiveStream(activeStreams[0])
    } else {
      setActiveStream(null)
    }
    //fetchStreams()
  }

  return {
    activeSource: activeStream ? { src: activeStream.playbackUrl, type: 'application/x-mpegURL' } as Source : null,
    onStreamError,
  }
}

export default useLiveStream
