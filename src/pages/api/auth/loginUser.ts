import type { NextApiHandler } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { createAxios } from '../../../../libs/axios'
import { LoginUserDto } from 'types/dto/loginDto'
import { returnErrorResponse } from 'utils/returnErrorResponse'

const { axios, isAxiosError } = createAxios()
const LOGIN_USER_PATH = '/auth/loginUser'

const handler: NextApiHandler = async (req, res) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { accessToken } = parseCookies({ req })
        const { data } = await axios.post<LoginUserDto>(LOGIN_USER_PATH, {
          token: accessToken,
        })
        const { user, token } = data
        setCookie({ res }, 'accessToken', token, {
          maxAge: 60 * 60 * 24 * 1000, // 1日
          // jsで取得できなくなる、これも入れとくべき
          httpOnly: true,
          // httpsでのみ送られるようになる。入れとくべき
          secure: true,
          path: '/',
        })
        return res.status(200).json({ user })
      } catch (err) {
        return returnErrorResponse(isAxiosError, err, res)
      }

    default:
      return res.status(400).json({ message: 'Method not allowed' })
  }
}

export default handler
