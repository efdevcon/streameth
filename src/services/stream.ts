import { get } from 'utils/requests'
import { Stream } from 'types'

export const getStreams = async (streamId?: string): Promise<Array<Stream>> => {
  return await get(`/api/streams?streamId=${streamId}`)
}
