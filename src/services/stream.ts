import { get } from 'utils/requests'
import { Stream } from 'types'

export const getStreams = async (): Promise<Array<Stream>> => {
  return await get('/api/streams')
}

export const getStream = async (streamId: string): Promise<Stream | null> => {
  return await get(`/api/streams/${streamId}`)
}
