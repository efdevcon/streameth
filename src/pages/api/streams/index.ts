import type { NextApiRequest, NextApiResponse } from 'next'
import { streamItem } from 'types'
import { Livepeer } from 'services/streamProviders/livepeer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { ids } = req.query
    const provider = new Livepeer()

    let streamIds: string[] = []

    if (ids && typeof ids === 'string') {
      streamIds = ids.split(',')
    }

    try {
      const streams: streamItem[] = await provider.getStreams(streamIds)
      console.log(streams)
      // const recordings: Recording[][] = await Promise.all(
      //   streams.map((stream) => {
      //     return provider.getRecordings(stream.id)
      //   })
      // )

      // merge recordings with their respective stream
      // streams.forEach((stream, index) => {
      //   stream.recordings = recordings[index]
      // })

      return res.status(200).json(streams)
    } catch (e: any) {
      console.log('Unable to fetch streams')
      return res.status(e.statusCode).json(e)
    }
  }

  res.status(404).json({})
}
