import VideoJS from './VideoJS'
import { PlayerProps } from './types'
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

const Player = ({ ...props }: PlayerProps) => {
  if (!props.source) return <OfflinePlayer />
  if (props.poster === undefined) props.poster = '/images/default.png'
  if (props.playlist === undefined) props.playlist = null
  // override src url for spain
  const source = props.source
  source.src = source.src.replace('cdn.livepeer.com', 'livepeercdn.com')

  const handlePlayerReady = (player: any) => {
    console.log('player is ready')
    player.on('error', (e: any) => {
      console.log('error', e)
      props.onStreamError()
    })

    player.on('waiting', () => {
      console.log('player is waiting')
      const currentPlaylist = player.tech().vhs.playlists.media()
      if (currentPlaylist?.custom?.livepeerError) {
        player.error({ code: '4' })
      }
    })
  }

  return <VideoJS source={props.source} poster={props.poster} onReady={handlePlayerReady} playlist={props.playlist} />
}

export default Player
