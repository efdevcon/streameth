import type { NextApiRequest, NextApiResponse } from 'next'
import * as StreamProviders from 'models/streamProvider'
import { STREAM_PROVIDER } from 'utils/constants'
import { Stream, Recording } from 'types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query

    const providerName: keyof typeof StreamProviders = STREAM_PROVIDER
    const provider = new StreamProviders[providerName]()

    let stream: Stream | null = null

    if (id && typeof id === 'string') {
      stream = await provider.getStream(id)

      if (stream) {
        const recordings: Array<Recording> = await provider.getRecordings(id)
        stream.recordings = recordings
      }
    }

    return res.status(200).json(stream)
  }

  res.status(404).json({})
}
