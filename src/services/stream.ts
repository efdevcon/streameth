import { get } from 'utils/requests'
import { Stream } from 'types'

export const getStreams = async (ids?: string[]): Promise<Stream[]> => {
  return await get('/api/streams', { ids })
}

export const getStream = async (streamId: string): Promise<Stream | null> => {
  return await get(`/api/streams/${streamId}`)
}
