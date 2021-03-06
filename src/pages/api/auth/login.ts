import type { NextApiHandler } from 'next'
import { setCookie } from 'nookies'
import { createAxios } from '../../../../libs/axios'
import { LoginDto } from 'types/dto/loginDto'
import { PostLoginBody } from 'types/requestBody/login'
import { PostSignupBody } from 'types/requestBody/signup'
import { returnErrorResponse } from 'utils/returnErrorResponse'

const { axios, isAxiosError } = createAxios()
const LOGIN_PATH = '/auth/login'

const handler: NextApiHandler = async (req, res) => {
  const { method } = req
  switch (method) {
    case 'POST':
      const { body } = req
      const requestBody: PostLoginBody = body
      try {
        const { data } = await axios.post<LoginDto>(LOGIN_PATH, requestBody)
        const { token } = data
        setCookie({ res }, 'accessToken', token, {
          maxAge: 60 * 60 * 24 * 1000, // 1日
          // jsで取得できなくなる、これも入れとくべき
          httpOnly: true,
          // httpsでのみ送られるようになる。入れとくべき
          secure: true,
          path: '/',
        })
        return res.status(201).json({ isLoggedIn: true })
      } catch (err) {
        return returnErrorResponse(isAxiosError, err, res)
      }

    default:
      return res.status(400).json({ message: 'Method not allowed' })
  }
}

export default handler
