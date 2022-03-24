import { Stream, StreamProvider } from 'types'
import { get } from 'utils/requests'

const BASE_API = 'https://livepeer.com/api'

interface LivepeerStreamObj {
  isActive: boolean
  id: string
  name?: string
  playbackId: string
  // other fields
}

export class Livepeer implements StreamProvider {
  mapStreamObj(data: any): Stream {
    return {
      id: data.id,
      isActive: data.isActive,
      playbackUrl: `https://cdn.livepeer.com/hls/${data.playbackId}/index.m3u8`,
    }
  }

  async getStreams(): Promise<Array<Stream>> {
    try {
      const streams: Array<LivepeerStreamObj> = await get(`${BASE_API}/stream`, {
        Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
      })

      return streams.map(stream => this.mapStreamObj(stream))
    } catch (e) {
      console.error('Error fetching Livepeer streams', e)

      return []
    }
  }

  async getStream(streamId: string): Promise<Stream | null> {
    try {
      const stream: LivepeerStreamObj = await get(`${BASE_API}/stream/${streamId}`, {
        Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
      })

      return this.mapStreamObj(stream)
    } catch {
      return null
    }
  }
}
