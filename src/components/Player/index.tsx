import { useState, useRef, useEffect } from 'react'
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




// Temporary fix for palyback in Spain
const tempParseSource = (source: string) => {
  const [, url, type] = source.match(/^(.*)\/(.*)$/) || []

  const extractStreamHLSid = url.split('/')[4]
  const newUrl = `https://livepeercdn.com/hls/${extractStreamHLSid}/index.m3u8`
  return {
    newUrl,
    type,
  }
}


const checkSrcIsActive = (src: string) => {
  // make get request to check if src is active
  return  false
}

const Player = ({ streams, poster, setStatus, isLoading }: PlayerProps) => {


  if (isLoading) {
    return <div>Loading player...</div>
  }
  if (streams.length === 0) {
    return <div>Error fetching stream</div>
  }

  useEffect(() => {
    // replace cdn for spain
    streams = streams.map(stream => {
      const { newUrl, type } = tempParseSource(stream.playbackUrl)
      return {
        ...stream,
        playbackUrl: newUrl,
        type,
        isActive: checkSrcIsActive(stream.playbackUrl),
      }
    })
  }, [])

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
    // check for any active src and return that

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


    player.tech().on('loadedmetadata', () => {
      console.log("loadedmetadata", player.tech().vhs.playlists.master)
    })

      player.reloadSourceOnError({

        // getSource allows you to override the source object used when an error occurs
        getSource: function (reload) {
          console.log('Reloading because of an error');
          const checkForActiveSrc = streams.find(stream => stream.isActive)
          if (checkForActiveSrc !== undefined) {
          const index = changeStreamIndex()
          const source = {
            src: checkForActiveSrc.playbackUrl,
            type: 'application/x-mpegURL',
          }
          reload(source)
          }
        }, 
        errorInterval: 10 
      });


    player.on('error', e => {
      console.log('error', e)

    })
 
    player.on('waiting', () => {
      console.log('player is waiting')
      console.log("media", player.tech().vhs.playlists.media())
      const currentPlaylist = player.tech().vhs.playlists.media()
      console.log(currentPlaylist)
      if(currentPlaylist.custom?.livepeerError) {
        player.error({code: '4'})
      }
    })

  }

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
}

export default Player
