import { useState, useRef } from 'react'
import VideoJS from './VideoJS'
import { Stream } from 'types'
import { get } from '../../utils/requests'

// We could link player state to player header using setStatus
enum PlayerState {
  Idle,
  Playing,
  Error,
}

interface PlayerProps {
  streams: Stream[]
  poster: string
  isLoading: boolean
  setStatus?: (status: string) => void
}

const Player = ({ streams, poster, setStatus, isLoading }: PlayerProps) => {
  if (isLoading) {
    return <div>Loading player...</div>
  }
  if (streams.length === 0) {
    return <div>Error fetching stream</div>
  }
  const playerRef = useRef(null)
  const [currentStreamIndex, setCurrentStreamIndex] = useState<number>(0)
  const [videoJsOptions, setVideoJsOptions] = useState({
    poster: poster || '',
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: streams[currentStreamIndex].playbackUrl,
        type: 'application/x-mpegURL',
      },
    ],
  })

  const changeStreamIndex = () => {
    let newStreamIndex = currentStreamIndex + 1

    // Check array bounds; if out of bounds, set currentStreamIndex to 0
    if (!streams[newStreamIndex]) {
      newStreamIndex = 0
    }

    setCurrentStreamIndex(newStreamIndex)

    return newStreamIndex
  }

  // TODO: change type
  const handlePlayerReady = (player: any) => {
    playerRef.current = player

    player.reloadSourceOnError({
      // getSource allows you to override the source object used when an error occurs
      getSource: function (reload) {
        console.log('Reloading because of an error')

        const index = changeStreamIndex()

        // call reload() with a fresh source object
        // you can do this step asynchronously if you want (but the error dialog will
        // show up while you're waiting)
        reload({
          src: streams[index].playbackUrl,
          type: 'application/x-mpegURL',
        })
      },

      // errorInterval specifies the minimum amount of seconds that must pass before
      // another reload will be attempted
      errorInterval: 5,
    })

    player.on('error', e => {
      console.log('error', e)
    })

    player.on('ready', () => {
      player.tech().on('usage', e => {
        console.log(e.name)
      })
    })

    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting')
    })

    player.on('dispose', () => {
      console.log('player will dispose')
    })
  }

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
}

export default Player
