import type { NextApiHandler } from 'next'
import { createAxios } from '../../../../libs/axios'
import { SignUpDto } from 'types/dto/signupDto'
import { PostLoginBody } from 'types/requestBody/login'
import { returnErrorResponse } from 'utils/returnErrorResponse'

const { axios, isAxiosError } = createAxios()
const FILM_REVIEW_PATH = '/signup'

const handler: NextApiHandler = async (req, res) => {
  const { method } = req

  switch (method) {
    case 'POST':
      const { body } = req
      const requestBody: PostLoginBody = body
      try {
        const { data } = await axios.post<SignUpDto>(
          FILM_REVIEW_PATH,
          requestBody,
        )
        return res.status(201).json(data)
      } catch (err) {
        return returnErrorResponse(isAxiosError, err, res)
      }

    default:
      return res.status(400).json({ message: 'Method not allowed' })
  }
}

export default handler
