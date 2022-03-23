import type { NextApiRequest, NextApiResponse } from 'next'
import * as StreamProviders from '../../../models/streamProvider'
import { STREAM_PROVIDER } from '../../../utils/constants'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const providerName: keyof typeof StreamProviders = STREAM_PROVIDER
    const provider = new StreamProviders[providerName]()
    const streams = await provider.streams()

    return res.status(200).json(streams)
  }

  res.status(404).json({})
}
