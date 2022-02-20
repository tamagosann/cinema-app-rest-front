import type { NextApiHandler } from 'next'
import { createAxios } from '../../../../libs/axios'
import { UserDto } from 'types/dto/userDto'
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
          const { data } = await axios.get<UserDto>(
            pathBuilder({
              path: USER_PATH,
              queries: [
                {
                  name: 'userId',
                  value: userId,
                },
              ],
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
