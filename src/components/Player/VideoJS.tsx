import { useRef, useEffect } from 'react'
import videojs from 'video.js'
import qualitySelector from 'videojs-hls-quality-selector';
import contribQualityLevels from 'videojs-contrib-quality-levels'
import 'video.js/dist/video-js.css'
import "videojs-mux";

// TODO: Need to change types
export const VideoJS = (props: any) => {
  const videoRef = useRef(null)
  const playerRef = useRef<videojs.Player | null>(null)
  const { options, onReady } = props
  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return
      videojs.registerPlugin('hlsQualitySelector', qualitySelector);
      videojs.registerPlugin('qualityLevels', contribQualityLevels)
      const initTime = Date.now();
      const player = (playerRef.current = videojs(
        videoElement,
        { ...options, errorDisplay: false, html5: {
          vhs: {
            customTagParsers: [{
              expression: /#EXT-X-ERROR/,
              customType: 'livepeerError',
            }]
          }},   
          plugins: {  
            mux: {
              debug: false,
              data: {
                env_key: "8mi42im5d9uueq19dni35fgeq", // required
                // Metadata
                player_name: props.currentRoomId, // ex: 'My Main Player'
                player_init_time: initTime // ex: 1451606400000
              }
            }
          }
        },
        () => {
          onReady && onReady(player)
        }
      ));
    }


  }, [options, videoRef])


  useEffect(() => {
    const player = playerRef.current
    if (player) player.hlsQualitySelector({ displayCurrentQuality: true });
    return () => {
      if (player) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player style={{ borderRadius: '5px' }} >
      <video  ref={videoRef} className="video-js vjs-16-9 vjs-big-play-centered" />
    </div>
  )
}

export default VideoJS
