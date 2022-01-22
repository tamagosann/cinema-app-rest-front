import { FilmData } from 'common/test_mock/stabData'
import { PersonData } from 'common/test_mock/stabPersonData'
import { ReviewData } from 'common/test_mock/stabReviewData'

export type UserDto = {
  userId: string
  username: string
  icon: string
  iconColor: string
  favoritePeople: PersonData[]
  favoriteFilms: FilmData[]
  reviews: ReviewData[]
}
