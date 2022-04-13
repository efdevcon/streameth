import { Stream, StreamProvider, Recording } from 'types'
import { get } from 'utils/requests'

const BASE_API = 'https://livepeer.com/api'

interface LivepeerStream {
  isActive: boolean
  id: string
  name?: string
  playbackId: string
}

interface LivepeerSession {
  id: string
  recordingUrl: string
  recordingStatus: string
}

export class Livepeer implements StreamProvider {
  static readonly authHeader: HeadersInit = {
    Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
  }

  mapStreamObj(data: any): Stream {
    return {
      id: data.id,
      isActive: data.isActive,
      playbackUrl: `https://cdn.livepeer.com/hls/${data.playbackId}/index.m3u8`,
      recordings: [], // initialize empty recordings array; will merge later
    }
  }

  mapRecordingObj(data: any): Recording {
    return {
      id: data.id,
      recordingUrl: data.recordingUrl,
    }
  }

  async getStreams(ids: string[] = []): Promise<Stream[]> {
    try {
      const streams: LivepeerStream[] = await get(`${BASE_API}/stream`, {}, Livepeer.authHeader)

      return streams
        .filter(stream => {
          if (!stream.playbackId) {
            return false
          }

          if (ids.length > 0) {
            return ids.includes(stream.id)
          }

          return true
        })
        .map(stream => this.mapStreamObj(stream))
    } catch (e) {
      console.error('Error fetching Livepeer streams', e)

      return []
    }
  }

  async getStream(streamId: string): Promise<Stream> {
    try {
      const stream: LivepeerStream = await get(`${BASE_API}/stream/${streamId}`, {}, Livepeer.authHeader)

      return this.mapStreamObj(stream)
    } catch {
      return Promise.reject({ message: `Stream with ID ${streamId} not found`, statusCode: 404 })
    }
  }

  async getRecordings(streamId: string): Promise<Recording[]> {
    try {
      const sessions: LivepeerSession[] = await get(
        `${BASE_API}/stream/${streamId}/sessions`,
        { record: 1 },
        Livepeer.authHeader
      )

      return sessions
        .filter(session => session.recordingStatus === 'ready')
        .map(session => this.mapRecordingObj(session))
    } catch {
      return []
    }
  }
}
