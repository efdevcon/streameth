import { useRef, useEffect } from 'react'
import videojs from 'video.js'
// import videojsPlaylist from 'videojs-playlist'
import qualitySelector from 'videojs-hls-quality-selector'
import contribQualityLevels from 'videojs-contrib-quality-levels'
import 'video.js/dist/video-js.css'
import 'videojs-mux'
import 'videojs-youtube'
import { VideoJSProps } from './types'

export const VideoJS = ({ ...props }: VideoJSProps) => {
  const { onReady, poster, source } = props
  const videoRef = useRef(null)
  const playerRef = useRef<videojs.Player | null>(null)
  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return
      videojs.registerPlugin('hlsQualitySelector', qualitySelector)
      videojs.registerPlugin('qualityLevels', contribQualityLevels)
      const initTime = Date.now()
      const player = (playerRef.current = videojs(
        videoElement,
        {
          techOrder: ['html5', 'youtube'],
          poster: poster || '',
          autoplay: true,
          errorDisplay: false,
          controls: true,
          responsive: true,
          fluid: true,
          sources: [source],
          html5: {
            vhs: {
              customTagParsers: [
                {
                  expression: /#EXT-X-ERROR/,
                  customType: 'livepeerError',
                },
              ],
            },
          },
          plugins: {
            mux: {
              debug: false,
              data: {
                env_key: '', // required
                // Metadata
                player_name: '', // ex: 'My Main Player'
                video_id: '', // ex: 'abcd123'
                video_title: '', // ex: 'My Great Video'
                player_init_time: initTime, // ex: 1451606400000
              },
            },
          },
        },
        () => {
          onReady && onReady(player)
        }
      ))
    } else {
      const player = playerRef.current
      // prevent player from reloading the same src, causing interrupted playback
      if (player.src() !== props.source.src) {
        player.src([props.source])
      }
    }
  }, [videoRef, source, poster])

  useEffect(() => {
    const player = playerRef.current
    if (player) player.hlsQualitySelector({ displayCurrentQuality: true })
    return () => {
      if (player) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player style={{ borderRadius: '5px' }}>
      <video ref={videoRef} className="video-js vjs-16-9 vjs-big-play-centered" />
    </div>
  )
}

export default VideoJS
