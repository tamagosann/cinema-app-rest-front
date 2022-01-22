import { FilmReviewDto } from 'types/dto/filmReviewDto'

export type PostFilmReviewBody = Omit<
  FilmReviewDto,
  'filmReviewId' | 'reviewDate'
>
