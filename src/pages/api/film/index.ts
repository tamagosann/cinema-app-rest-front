import type { NextApiHandler } from 'next'
import { createAxios } from '../../../../libs/axios'
import { FilmInfo, FilmInfoListDto } from 'types/dto/ssr'
import { FetchPersonsDTO } from 'types/film'
import { pathBuilder } from 'utils/pathbuilder'
import { returnErrorResponse } from 'utils/returnErrorResponse'

const { axios, isAxiosError } = createAxios()
const FILM_PATH = '/film'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end()

  const { page, with_genres, filmId } = req.query
  if (
    Array.isArray(page) ||
    Array.isArray(filmId) ||
    Array.isArray(with_genres)
  )
    return res.status(403).end()

  if (!page && !with_genres && !!filmId) {
    try {
      const { data } = await axios.get<FilmInfo>(
        pathBuilder({
          path: FILM_PATH,
          queries: [
            {
              name: 'filmId',
              value: filmId,
            },
          ],
        }),
      )
      return res.status(200).json(data)
    } catch (err) {
      return returnErrorResponse(isAxiosError, err, res)
    }
  }

  if (!filmId && !!page && !!with_genres) {
    try {
      const { data } = await axios.get<FilmInfoListDto>(
        pathBuilder({
          path: FILM_PATH,
          queries: [
            {
              name: 'with_genres',
              value: with_genres,
            },
            {
              name: 'page',
              value: page,
            },
          ],
        }),
      )
      return res.status(200).json(data)
    } catch (err) {
      return returnErrorResponse(isAxiosError, err, res)
    }
  }
}

export default handler
