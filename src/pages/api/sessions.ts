import type { NextApiRequest, NextApiResponse } from 'next'
import { GetSessions } from 'services/sessions'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessions = await GetSessions()
  res.status(200).json({ data: sessions })
}

