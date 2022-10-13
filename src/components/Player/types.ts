export interface PlayerProps {
  source: Source | null
  embedded?: boolean
  playlist?: Playlist | null
  poster?: string
  onStreamError: () => void
}

export interface VideoJSProps {
  source: Source
  autoPlay?: boolean
  playlist: Playlist | null
  poster: string
  onReady: (player: any) => void
}

enum sourceType {
  HLS = 'application/x-mpegURL',
  MP4 = 'video/mp4',
  YOUTUBE = 'video/youtube',
}

export interface Source {
  src: string
  type: 'application/x-mpegURL' | 'video/mp4' | 'video/youtube'
}

interface PlaylistSource extends Source {
  poster: string
}

export interface Playlist {
  sources: PlaylistSource[]
}
