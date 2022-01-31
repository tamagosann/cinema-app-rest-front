import { FilmReviewDto } from './dto/filmReviewDto'
import { FilmInfo } from './dto/ssr'
import { PersonData } from 'common/test_mock/stabPersonData'

export type FetchFilmsByfilmIdDTO = {
  results: FilmInfo[]
}

export type FetchPersonsDTO = {
  page: number
  results: PersonData[]
  total_pages: number
  total_results: number
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

export type FetchFilmReviewsByFilmIdDTO = {
  page: number
  results: FilmReviewDto[]
  totalPages: number
  totalResults: number
}
