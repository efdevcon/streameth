import type { NextApiRequest, NextApiResponse } from 'next'
import * as StreamProviders from 'models/streamProvider'
import { STREAM_PROVIDER } from 'utils/constants'
import { Stream } from 'types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { streamId } = req.query

    const providerName: keyof typeof StreamProviders = STREAM_PROVIDER
    const provider = new StreamProviders[providerName]()

    let streams: Array<Stream> = []

    if (streamId && typeof streamId === 'string') {
      const stream = await provider.getStream(streamId)

      if (stream) {
        streams = [stream]
      }
    } else {
      streams = await provider.getStreams()
    }

    return res.status(200).json(streams)
  }

  res.status(404).json({})
}
