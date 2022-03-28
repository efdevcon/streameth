import type { NextApiRequest, NextApiResponse } from 'next'
import { initStreamProvider } from 'models/streamProvider'
import { Stream, Recording } from 'types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const provider = initStreamProvider()

    const streams: Stream[] = await provider.getStreams()
    const recordings: Recording[][] = await Promise.all(
      streams.map(stream => {
        return provider.getRecordings(stream.id)
      })
    )

    // merge recordings with their respective stream
    streams.forEach((stream, index) => {
      stream.recordings = recordings[index]
    })

    return res.status(200).json(streams)
  }

  res.status(404).json({})
}
