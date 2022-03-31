import React, { useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

// TODO: Need to change types
export const VideoJS = (props: any) => {
  const videoRef = useRef(null)
  const playerRef = useRef<videojs.Player | null>(null)
  const { options, onReady } = props

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready')
        onReady && onReady(player)
      }))
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef])

  React.useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-16-9 vjs-big-play-centered" />
    </div>
  )
}

export default VideoJS
