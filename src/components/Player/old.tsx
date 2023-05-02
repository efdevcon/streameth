import Image from 'next/image'
import VideoJS from './VideoJS'
import { PlayerProps } from './types'
import defaultPoster from 'assets/images/default.png'

const OfflinePlayer = () => {
  return (
    <div className='bg-gray-800 flex flex-col items-center justify-center w-full h-full'>
      <span className='round text-2xl font-bold text-gray-500'>Offline</span>
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
