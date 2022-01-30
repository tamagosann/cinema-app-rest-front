import { MockedRequest, ResponseResolver, restContext } from 'msw'
import { stabFilmData } from 'common/test_mock/stabData'
import { stabReview, stabReviewList } from 'common/test_mock/stabReviewData'

export const mockGetFilmReview: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const query = req.url.searchParams
  const filmId = query.get('filmId')
  const filmReviewId = query.get('filmReviewId')
  const userId = query.get('userId')
  if (!!filmId) {
    return res(ctx.status(200), ctx.json(stabFilmData))
  } else if (!!filmReviewId) {
    return res(ctx.status(200), ctx.json(stabReview))
  } else if (!!userId) {
    return res(ctx.status(200), ctx.json(stabReviewList))
  }
}
