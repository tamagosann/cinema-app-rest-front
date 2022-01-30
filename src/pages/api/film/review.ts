import type { NextApiHandler } from 'next'
import { createAxios } from '../../../../libs/axios'
import {
  FilmReviewDto,
  FilmReviewsDto,
  PostFilmReviewBody,
} from 'types/dto/filmReviewDto'
import { FetchPersonsDTO } from 'types/film'
import { pathBuilder } from 'utils/pathbuilder'
import { returnErrorResponse } from 'utils/returnErrorResponse'

const { axios, isAxiosError } = createAxios()
const FILM_REVIEW_PATH = '/film/review'

const handler: NextApiHandler = async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      const { filmId, filmReviewId, userId } = req.query
      if (
        Array.isArray(filmReviewId) ||
        Array.isArray(filmId) ||
        Array.isArray(userId)
      )
        return res.status(403).end()

      // 特定の映画のレビュー一覧を取得
      if (!filmReviewId && !userId && !!filmId) {
        try {
          const { data } = await axios.get<FilmReviewsDto>(
            pathBuilder({
              path: FILM_REVIEW_PATH,
              queries: [filmId],
            }),
          )
          return res.status(200).json(data)
        } catch (err) {
          return returnErrorResponse(isAxiosError, err, res)
        }
      }

      // 特定のユーザーのレビュー一覧を取得
      if (!filmReviewId && !filmId && !!userId) {
        try {
          const { data } = await axios.get<FilmReviewsDto>(
            pathBuilder({
              path: FILM_REVIEW_PATH,
              queries: [userId],
            }),
          )
          return res.status(200).json(data)
        } catch (err) {
          return returnErrorResponse(isAxiosError, err, res)
        }
      }

      // filmReviewIdと一致するレビューを取得
      if (!filmId && !userId && !!filmReviewId) {
        try {
          const { data } = await axios.get<FilmReviewDto>(
            pathBuilder({
              path: FILM_REVIEW_PATH,
              queries: [filmReviewId],
            }),
          )
          return res.status(200).json(data)
        } catch (err) {
          return returnErrorResponse(isAxiosError, err, res)
        }
      }
      return res.status(403).end()

    case 'POST':
      const { body } = req
      const requestBody: PostFilmReviewBody = body
      try {
        const { data } = await axios.post<FilmReviewDto>(
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
