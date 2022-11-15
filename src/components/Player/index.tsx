import Image from 'next/image'
import VideoJS from './VideoJS'
import { PlayerProps } from './types'
import defaultPoster from 'assets/images/default.png'

const Player = ({ ...props }: PlayerProps) => {
  if (!props.source) return <Image alt="text" layout='fill' src={defaultPoster} />
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
