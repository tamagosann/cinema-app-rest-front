import type { NextApiHandler } from 'next'
import { createAxios } from '../../../../libs/axios'
import { stabFilmDataList } from 'common/test_mock/stabData'
import { stabPersonDataList } from 'common/test_mock/stabPersonData'
import { stabReviewList } from 'common/test_mock/stabReviewData'
import { UserDto } from 'types/dto/userDto'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'
import { pathBuilder } from 'utils/pathbuilder'
import { returnErrorResponse } from 'utils/returnErrorResponse'

const { axios, isAxiosError } = createAxios()
const USER_PATH = '/user'

const handler: NextApiHandler = async (req, res) => {
  const { method, query } = req
  const { userId } = query
  if (!userId || Array.isArray(userId)) return res.status(403).end()

  try {
    switch (method) {
      case 'GET':
        try {
          // manageを入れる方法でうまくいかなかったので一旦urlをベタ打ちしてます、mockはできました
          const { data } = await axios.get<UserDto>(
            pathBuilder({
              path: USER_PATH,
              queries: [userId],
            }),
          )
          return res.status(200).json(data)
        } catch (err) {
          return returnErrorResponse(isAxiosError, err, res)
        }

      default:
        return res.status(400).json({ message: 'Method not allowed' })
    }
  } catch (err) {
    if (err instanceof Error) {
      const { name, message, stack } = err
      return res.status(500).json({ name, message, stack })
    }
  }
}

export default handler

// userId: '0001',
// username: '武藤遊戯',
// icon: `${TMDB_IMAGE_URL}/4SYTH5FdB0dAORV98Nwg3llgVnY.jpg`,
// iconColor: 'blue',
// favoriteFilms: stabFilmDataList,
// favoritePeople: stabPersonDataList,
// reviews: stabReviewList,
