export type FilmReviewDto = {
  filmReviewId: string
  userId: string
  userIconColor: string
  userIconUrl: string
  username: string
  star: number
  reviewDate: number
  reviewTitle: string
  reviewOverview: string
}

export type FilmReviewsDto = FilmReviewDto[]

export type PostFilmReviewDto = {
  success: boolean
}

export type PostFilmReviewBody = Omit<
  FilmReviewDto,
  'filmReviewId' | 'reviewDate'
>
