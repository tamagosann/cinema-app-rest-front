import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { FC, useState } from 'react'
import { requests } from '../utils/requests'
import { BASE_URL } from 'common/urls'
import IndexView from 'views/Index'

const totalPage = 1000

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>

const IndexPage: FC<ServerSideProps> = (props) => {
  const { filmList: filmListFromProps } = props
  const [filmList, setFilmList] = useState<any[]>(filmListFromProps)
  const [hasMore, setHasMore] = useState(true) //再読み込み判定
  const [isFetching, setIsFetching] = useState(false)

  console.log(filmListFromProps)

  const getFixedOverview = (overview: string) => {
    if (overview.length <= 160) return overview
    const fixedOverView = overview.substr(0, 160) + '...'
    return fixedOverView
  }

  const loadMore = async (page: number) => {
    const {
      fetchTrending: { url },
    } = requests

    setIsFetching(true)

    const response = await fetch(
      `https://api.themoviedb.org/3${url}&page=${page}`,
    ) //API通信
    const { results: filmListToBeAdded } = await response.json() //取得データ
    //データ件数が0件の場合、処理終了
    if (filmListToBeAdded.length < 1) {
      setHasMore(false)
      return
    }

    setIsFetching(false)

    //取得データをリストに追加
    setFilmList([...filmList, ...filmListToBeAdded])
  }

  return (
    <>
      <IndexView
        {...{
          filmList,
          hasMore,
          getFixedOverview,
          loadMore,
          isFetching,
        }}
      />
    </>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { genre = '', search = '' },
  } = context

  const requestUrl =
    Array.isArray(genre) || genre === ''
      ? requests.fetchTrending.url
      : requests[genre]?.url

  console.log('requestUrl')
  console.log(requestUrl)

  const { results: filmList } = await fetch(
    `https://api.themoviedb.org/3${requestUrl}`,
  ).then((res) => {
    return res.json()
  })

  return {
    props: {
      filmList,
    },
  }
}
