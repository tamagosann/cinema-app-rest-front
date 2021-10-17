import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { FC, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { requests } from '../utils/requests'
import { BASE_URL } from 'common/urls'

const totalPage = 1000

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  mt20: {
    marginTop: 0,
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    textOverflow: 'ellipsis',
  },
})

const IndexPage: FC<ServerSideProps> = (props) => {
  const { filmList: filmListFromProps } = props
  const [filmList, setFilmList] = useState<any[]>(filmListFromProps)
  const [hasMore, setHasMore] = useState(true) //再読み込み判定
  const [isFetching, setIsFetching] = useState(false)
  const { root, mt20, title } = useStyles()
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

  const loader = (
    <Grid
      container
      spacing={3}
      alignItems='center'
      justifyContent='center'
      className={mt20}
    >
      {[...Array(2)].map((_: undefined, index) => (
        <Grid item xs={12} sm={6} md={4} className={root} key={index}>
          <Card>
            <CardActionArea onClick={() => {}}>
              <CardMedia title='Your title'>
                <div
                  style={{
                    position: 'relative',
                    width: 321,
                    height: 152,
                  }}
                >
                  <Skeleton variant='rectangular' width='100%' height='100%' />
                </div>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  <Skeleton height={32} />
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  <Skeleton height={80} />
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions>
              <IconButton onClick={() => {}}>
                <FavoriteIcon />
              </IconButton>
              <Typography>
                <Box component='span' p={2}>
                  Favorite!
                </Box>
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )

  const items = (
    <Grid
      container
      spacing={3}
      alignItems='center'
      justifyContent='center'
      className={mt20}
    >
      {filmList.map((result: any) => {
        return (
          <Grid item xs={12} sm={6} md={4} className={root} key={result.id}>
            <Card>
              <CardActionArea onClick={() => {}}>
                <CardMedia title='Your title'>
                  <div
                    style={{
                      position: 'relative',
                      width: 321,
                      height: 152,
                    }}
                  >
                    <Image
                      alt={result.title || result.original_title}
                      src={
                        `${BASE_URL}${
                          result.backdrop_path || result.poster_path
                        }` || `${BASE_URL}${result.poster_path}`
                      }
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                </CardMedia>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='h2'
                    className={title}
                  >
                    {result.title || result.original_name}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    {getFixedOverview(result.overview)}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions>
                <IconButton onClick={() => {}}>
                  <FavoriteIcon />
                </IconButton>
                <Typography>
                  <Box component='span' p={2}>
                    Favorite!
                  </Box>
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )

  return (
    <>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={!isFetching && hasMore}
        loader={loader}
        pageStart={1}
      >
        {items}
      </InfiniteScroll>
    </>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { genre },
  } = context

  const requestUrl =
    Array.isArray(genre) || genre === undefined
      ? requests.fetchTrending.url
      : requests[genre]?.url

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
  // return {
  //   props: { hasError: true },
  //   // notFound: true,
  //   // redirect: {
  //   //   destination: '/error'
  //   // }
  // };
}
