import type { NextApiHandler } from 'next'
import { destroyCookie } from 'nookies'

const handler: NextApiHandler = async (req, res) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        destroyCookie({ res }, 'accessToken')
        return res.status(200).json({ success: true })
      } catch (err) {
        return res.status(400).json({ message: 'logout failed' })
      }

    default:
      return res.status(400).json({ message: 'Method not allowed' })
  }
}

export default handler
