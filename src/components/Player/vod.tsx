import { Player as LivepeerPlayer } from '@livepeer/react'

interface Props {
  src?: string
}

const OfflinePlayer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-60 md:h-96  xl:h-full">
      <span className="round text-2xl font-bold text-gray-500">Video not available yet</span>
    </div>
  )
}

export const Player = ({ ...props }: Props) => {
  const { src } = props

  if (!src) return <OfflinePlayer />

  return (
    <LivepeerPlayer
      src={src}
      showTitle={false}
      showPipButton={false}
      autoPlay
      theme={{
        borderWidths: {
          containerBorderWidth: 0
        },
        colors: {
          accent: '#00a55f',
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

