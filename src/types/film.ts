import { FilmInfo } from './dto/ssr'

export type FetchFilmsByfilmIdDTO = {
  results: FilmInfo[]
}

export type FilmReviewType = {
  id: string
  userIconUrl: string
  username: string
  userIconColor: string
  star: number
  reviewTitle: string
  reviewDate: number
  overview: string
}
