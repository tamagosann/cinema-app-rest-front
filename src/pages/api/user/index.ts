import type { NextApiHandler } from 'next'
import { stabFilmDataList } from 'common/test_mock/stabData'
import { stabPersonDataList } from 'common/test_mock/stabPersonData'
import { stabReviewList } from 'common/test_mock/stabReviewData'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

const handler: NextApiHandler = async (req, res) => {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        // try {
        //   // manageを入れる方法でうまくいかなかったので一旦urlをベタ打ちしてます、mockはできました
        //   const { data } = await axios.get<InformationsDto>(
        //     'https://rentalcar-api.api-uandcompany.com/info',
        //   )
        //   return res.status(200).json(data)
        // } catch (err) {
        //   if (isAxiosError(err)) {
        //     console.log(err)
        //     return res
        //       .status(err.response?.status!)
        //       .json({ detail: err.response?.data.detail })
        //   }
        //   return res.status(500).json({ detail: 'Internal Server Error' })
        // }
        return res.status(200).json({
          userId: '0001',
          username: '武藤遊戯',
          icon: `${TMDB_IMAGE_URL}/4SYTH5FdB0dAORV98Nwg3llgVnY.jpg`,
          iconColor: 'blue',
          favoriteFilms: stabFilmDataList,
          favoritePeople: stabPersonDataList,
          reviews: stabReviewList,
        })
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
