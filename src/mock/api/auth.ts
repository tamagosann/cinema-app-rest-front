import { MockedRequest, ResponseResolver, restContext } from 'msw'

export const mockLogin: ResponseResolver<MockedRequest, typeof restContext> =
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.cookie('sss', 'sss', {
        httpOnly: true,
        path: '/',
      }),
      ctx.json({
        name: '星宮いちご',
      }),
    )
  }

export const mockLogout: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx,
) => {
  return res(
    ctx.status(200),
    ctx.cookie('sss', 'sss', {
      expires: new Date(0),
    }),
    ctx.json('logout'),
  )
}
