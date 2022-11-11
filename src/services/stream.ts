import { get } from 'utils/requests'
import { streamItem } from 'types'

export const getStreams = async (ids?: string[]): Promise<streamItem[]> => {
  return await get('/api/streams', { ids })
}

export const getStream = async (streamId: string): Promise<streamItem | null> => {
  return await get(`/api/streams/${streamId}`)
}
