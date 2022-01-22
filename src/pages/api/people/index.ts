import type { NextApiHandler } from 'next'
import { createAxios } from '../../../../libs/axios'
import { FetchPersonsDTO } from 'types/film'
import { pathBuilder } from 'utils/pathbuilder'
import { returnErrorResponse } from 'utils/returnErrorResponse'

const { axios, isAxiosError } = createAxios()

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end()

  const { page, query } = req.query
  if (!page || Array.isArray(page) || Array.isArray(query))
    return res.status(403).end()

  try {
    const { data } = await axios.get<FetchPersonsDTO>(
      pathBuilder({
        path: '/people',
        queries: [page, query],
      }),
    )
    return res.status(200).json(data)
  } catch (err: any) {
    return returnErrorResponse(isAxiosError, err, res)
  }
}

export default handler
