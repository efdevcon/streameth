import type { NextApiRequest, NextApiResponse } from 'next'
import { Stream, Recording } from 'types'
import { initStreamProvider } from 'models/streamProvider'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query
    const provider = initStreamProvider()

    let stream: Stream | null = null

    if (id && typeof id === 'string') {
      stream = await provider.getStream(id)

      if (stream) {
        const recordings: Recording[] = await provider.getRecordings(id)
        stream.recordings = recordings
      }
    }

    return res.status(200).json(stream)
  }

  res.status(404).json({})
}
