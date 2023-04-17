import { Player as LivepeerPlayer, useStream, useStreamSessions, useStreamSession, StreamSession } from '@livepeer/react'
import { useState, useEffect, useCallback } from 'react'
import { StreamId } from 'types/index'
// @ts-ignore
import mux from 'mux-embed'
import Image from 'next/image'

interface Props {
  stream: StreamId[]
}

const OfflinePlayer = () => {
  return (
    <div className="w-full  relative">
      <div className=" inset-0 bg-[#D9D9D9] flex items-center justify-center flex-col aspect-video">
        <span className="text-2xl font-bold text-black">Offline</span>
        <span className="text-black dark:text-gray-300 text-xs hidden md:block mt-2">Powered by</span>
        <a className="relative w-24 lg:w-32 h-6" href="https://streameth.org" target="_blank" rel="noreferrer">
          <Image src="/streameth.png" alt="streamETH" layout="fill" objectFit="contain" />
        </a>
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
