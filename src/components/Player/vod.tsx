import { Player as LivepeerPlayer } from '@livepeer/react'

const OfflinePlayer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-60 md:h-96  xl:h-full">
      <span className="round text-2xl font-bold text-gray-500">Video not available yet</span>
    </div>
  )
}

export const Player = ({ src }: { src?: string }) => {
  if (!src) return <OfflinePlayer />

  return <LivepeerPlayer objectFit="cover" src={src} showTitle={false} showPipButton={false} muted={false} autoPlay />
}
