import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    console.log('LIVEPEER_API_KEY', process.env.LIVEPEER_API_KEY)
  }

  res.status(200).json({})
}
