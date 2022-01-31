export type FilmReviewDto = {
  filmReviewId: string
  userId: string
  iconColor: string
  icon: string
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
