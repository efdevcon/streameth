import { useState, useRef } from 'react'
import VideoJS from './VideoJS'
import { Room, Stream, Event } from 'types'

interface PlayerProps {
  src: string | null
  poster: string
  eventName: Event['name']
  setStatus?: (status: string) => void
  onStreamError: () => void
}

const Player = ({ src, poster, onStreamError, eventName }: PlayerProps) => {
  if (!src) return <img width={'100%'} src={poster ?? '/posters/default.png'} alt="poster" />

  const playerRef = useRef(null)
  const videoJsOptions = {
    poster: poster || '',
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: src.replace('cdn.livepeer.com', 'livepeercdn.com'),
        type: 'application/x-mpegURL',
      },
    ],
  }

  const handlePlayerReady = (player: any) => {
    playerRef.current = player

    player.reloadSourceOnError({
      // getSource allows you to override the source object used when an error occurs
      getSource: function (reload: any) {
        console.log('Reloading because of an error')
        onStreamError() // this should automatically trigger player reload
      },
      errorInterval: 1,
    })

    player.on('error', (e: any) => {
      console.log('error', e)
    })

    player.on('waiting', () => {
      console.log('player is waiting')
      const currentPlaylist = player.tech().vhs.playlists.media()
      if (currentPlaylist.custom?.livepeerError) {
        player.error({ code: '4' })
      }
    })
  }

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} eventName={eventName} />
}

export default Player
