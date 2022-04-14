import { useRef, useEffect } from 'react'
import videojs from 'video.js'
import qualitySelector from 'videojs-hls-quality-selector';
import contribQualityLevels from 'videojs-contrib-quality-levels'
import 'video.js/dist/video-js.css'


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
      const player = (playerRef.current = videojs(
        videoElement,
        { ...options, errorDisplay: false, autoplay: false, html5: {
          vhs: {
            customTagParsers: [{
              expression: /#EXT-X-ERROR/,
              customType: 'livepeerError',
            }]
        } }},
        
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
