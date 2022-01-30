import { rest } from 'msw'
import { mockLogin, mockLogout } from './api/auth'
import { mockGetFilmReview } from './api/filmReview'

const host = 'http://localhost:3333'

export const handlers = [
  rest.post(`${host}/login`, mockLogin),
  rest.post(`${host}/logout`, mockLogout),
  rest.get(`${host}/film/review`, mockGetFilmReview),
]
