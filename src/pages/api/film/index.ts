import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET') res.status(405).end()
  console.log('きたよ')
  try {
    const response = await fetch(`${process.env.BFF_URL}/film/review`)
    const data = await response.json()
    res.status(200).json(data)
  } catch (err: any) {
    return res.status(500).json(err)
  }
}
