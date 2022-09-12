import { useState, useEffect } from 'react'
import useInterval from '@use-it/interval'
import moment from 'moment'
import { Stage } from 'types'
import { Stream } from 'types/config'
import { Source } from 'components/Player/types'
import { getStreams } from 'services/stream'

// TODO: Stream type in config is to genereic? It should match livepeers response
const useLiveStream = (stream: Stage['stream']) => {
  const [streams, setStreams] = useState<any[]>([]) // TODO: Fix any-type
  const [activeSource, setActiveSource] = useState<Source | null>(null)

  const fetchStreams = async () => {
    try {
      const livepeerSources = await getStreams(stream.map((stream) => stream.id))
      setStreams(livepeerSources.filter((source: any) => source.isActive)) // TODO: Fix any-type
    } catch (e) {
      console.error(e)
    } finally {
    }
  }

  useEffect(() => {
    if (streams.length > 0) {
      setActiveSource({ src: streams[0].playbackUrl, type: 'application/x-mpegURL' })
    }
  }, [streams])

  useEffect(() => {
    if (stream) {
      fetchStreams()
    }
  }, [])

  const onStreamError = () => {
    console.log('error')
  }

  return {
    activeSource,
    onStreamError,
  }
}

export default useLiveStream
