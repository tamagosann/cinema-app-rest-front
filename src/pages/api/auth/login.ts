import type { NextApiHandler } from 'next'
import { createAxios } from '../../../../libs/axios'
import { LoginDto } from 'types/dto/loginDto'
import { PostSignupBody } from 'types/requestBody/signup'
import { returnErrorResponse } from 'utils/returnErrorResponse'

const { axios, isAxiosError } = createAxios()
const LOGIN_PATH = '/login'

const handler: NextApiHandler = async (req, res) => {
  const { method } = req

  switch (method) {
    case 'POST':
      const { body } = req
      const requestBody: PostSignupBody = body
      try {
        const { data } = await axios.post<LoginDto>(LOGIN_PATH, requestBody)
        return res.status(201).json(data)
      } catch (err) {
        return returnErrorResponse(isAxiosError, err, res)
      }

    default:
      return res.status(400).json({ message: 'Method not allowed' })
  }
}

export default handler
