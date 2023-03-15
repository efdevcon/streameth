import { Player as LivepeerPlayer, useStream, useStreamSessions, useStreamSession, StreamSession } from '@livepeer/react'
import { useState, useEffect } from 'react'
import { StreamId } from 'types/index'

interface Props {
  stream: StreamId[]
}


const OfflinePlayer = () => {
  return (
    <div className="bg-gray-800 flex flex-col items-center justify-center w-full h-full">
      <span className="round text-2xl font-bold text-gray-500">Offline</span>
    </div>
  )
}

export const Player = ({...props}: Props) => {
  
  const [currentPlaybackUrl, setCurrentPlaybackUrl] = useState<string | null>(null)
  const [currentStreamSession, setCurrentStreamSession] = useState<StreamSession['id']>('')
  const { data: stream } = useStream({
    streamId: props.stream[0].id,
    refetchInterval: (s) =>  (s?.isActive ? false : 5000),
  })
  const { data: sessions } = useStreamSessions(props.stream[0].id)
  const { data: session } = useStreamSession(currentStreamSession)

  useEffect(() => {
    if (sessions && sessions?.length > 0) {
      const allReadySessions = sessions.filter((s) => s.recordingStatus === 'ready')
      // find latest session
      const latestSession = allReadySessions.reduce((prev, current) => (prev.createdAt > current.createdAt ? prev : current))

      setCurrentStreamSession(latestSession.id)
    }
  }, [sessions])

  useEffect(() => {
    if (stream && stream.isActive) {
      setCurrentPlaybackUrl(stream.playbackUrl)
    } else if (session && session.recordingUrl && session.recordingStatus === 'ready') {
      setCurrentPlaybackUrl(session.recordingUrl)
    }
  }, [session, stream])

  if (!currentPlaybackUrl) return <OfflinePlayer />

  return (
    <LivepeerPlayer
      src={currentPlaybackUrl}
      showTitle={false}
      showPipButton={false}
      autoPlay
      theme={{
        borderStyles: {
          containerBorderStyle: 'hidden',
        },
        colors: {
          accent: '#00a55f',
        },
        shadows: {
          containerShadow: 'none',
          containerShadowHover: 'none',
        },
        space: {
          controlsBottomMarginX: '10px',
          controlsBottomMarginY: '5px',
          controlsTopMarginX: '15px',
          controlsTopMarginY: '10px',
        },
        radii: {
          containerBorderRadius: '0px',
        },
      }}
    />
  )
}
