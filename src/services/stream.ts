import { get } from '../utils/requests'

export const getStreams = async () => {
  return await get(`${process.env.NEXT_PUBLIC_ORIGIN}/api/streams`)
}
