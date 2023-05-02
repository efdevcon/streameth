import { Player as LivepeerPlayer } from '@livepeer/react'
import Image from 'next/image'
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

export const Player = ({ src }: { src?: string }) => {
  if (!src) return <OfflinePlayer />

  return (
    <LivepeerPlayer
      controls={{
        autohide: 3000,
      }}
      objectFit='contain'
      aspectRatio="16to9"
      src={src}
      showTitle={false}
      showPipButton={false}
      muted={false}
      autoPlay
    />
  )
}
