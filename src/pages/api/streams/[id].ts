import type { NextApiRequest, NextApiResponse } from 'next'
import { Stream, Recording } from 'types'
import { initStreamProvider } from 'models/streamProvider'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query
    const provider = initStreamProvider()

    if (id && typeof id === 'string') {
      try {
        const stream: Stream = await provider.getStream(id)
        // const recordings: Recording[] = await provider.getRecordings(id)

        // stream.recordings = recordings

        return res.status(200).json(stream)
      } catch (e: any) {
        return res.status(e.statusCode).json(e)
      }
    } else {
      return res.status(400).json({})
    }
  }

  res.status(404).json({})
}
