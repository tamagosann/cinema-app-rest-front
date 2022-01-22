import { AxiosError } from 'axios'
import { NextApiResponse } from 'next'

export const returnErrorResponse = (
  isAxiosError: (payload: any) => payload is AxiosError<any, any>,
  err: any,
  res: NextApiResponse,
) => {
  if (isAxiosError(err)) {
    console.error(err)
    return res
      .status(err.response?.status!)
      .json({ status_message: err.response?.data.status_message })
  }
  return res.status(500).json({ detail: 'Internal Server Error' })
}
