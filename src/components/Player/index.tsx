import { Player as LivepeerPlayer, useStream, useStreamSessions, useStreamSession, StreamSession } from '@livepeer/react'
import { useState, useEffect, useCallback } from 'react'
import { StreamId } from 'types/index'
// @ts-ignore
import mux from 'mux-embed'

interface Props {
  stream: StreamId[]
}

const OfflinePlayer = () => {
  return (
    <div className="w-full h-full relative">
      <div className=" inset-0 bg-gray-800 flex items-center justify-center aspect-video">
        <span className="text-2xl font-bold text-gray-500">Offline</span>
      </div>
    </div>
  )
}

export const Player = ({ ...props }: Props) => {
  const [currentPlaybackUrl, setCurrentPlaybackUrl] = useState<string | null>(null)
  const [currentStreamSession, setCurrentStreamSession] = useState<StreamSession['id']>('')
  const { data: stream } = useStream({
    streamId: props.stream[0].id,
    refetchInterval: (s) => (s?.isActive ? false : 5000),
  })
  const { data: sessions } = useStreamSessions(props.stream[0].id)
  const { data: session } = useStreamSession(currentStreamSession)

  // useEffect(() => {
  //   if (sessions && sessions?.length > 0) {
  //     const allReadySessions = sessions.filter((s) => s.recordingStatus === 'ready')
  //     // find latest session
  //     const latestSession = allReadySessions.reduce((prev, current) => (prev.createdAt > current.createdAt ? prev : current))

  const mediaElementRef = useCallback((ref: HTMLMediaElement) => {
    if (ref && process.env.NEXT_PUBLIC_MUX_ENV_KEY) {
      const initTime = mux.utils.now()

      mux.monitor(ref, {
        debug: true,
        data: {
          env_key: process.env.NEXT_PUBLIC_MUX_ENV_KEY, // required
          // Metadata fields
          player_name: 'Main Player', // any arbitrary string you want to use to identify this player
          player_init_time: initTime,
        },
      })
    }
  }, [])

  useEffect(() => {
    if (stream && stream.isActive) {
      setCurrentPlaybackUrl(stream.playbackUrl)
    } else if (session && session.recordingUrl && session.recordingStatus === 'ready') {
      setCurrentPlaybackUrl(session.recordingUrl)
    }
  }, [session, stream])

  if (!currentPlaybackUrl) return <OfflinePlayer />

  return <LivepeerPlayer objectFit="cover" src={currentPlaybackUrl} showTitle={false} showPipButton={false} muted={false} autoPlay />
}
