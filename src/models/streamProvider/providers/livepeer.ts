import { Stream, StreamProvider } from '../../../types'
import { get } from '../../../utils/requests'

const BASE_API = 'https://livepeer.com/api'

interface LivepeerStreamObj {
  isActive: boolean
  id: string
  name?: string
  playbackId: string
  // other fields
}

export class Livepeer implements StreamProvider {
  async streams() {
    try {
      const streams: Array<LivepeerStreamObj> = await get(`${BASE_API}/stream`, {
        Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
      })

      return streams.map(stream => {
        return {
          isActive: stream.isActive,
          id: stream.id,
          playbackUrl: `https://cdn.livepeer.com/hls/${stream.playbackId}/index.m3u8`,
        }
      }) as Array<Stream>
    } catch (e) {
      console.error('Error fetching Livepeer streams', e)

      return []
    }
  }
}
