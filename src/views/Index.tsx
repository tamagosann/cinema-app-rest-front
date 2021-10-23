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
  Box,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Image from 'next/image'
import React, { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { BASE_URL } from 'common/urls'
import { FilmList, TopSsrDto } from 'types/dto/ssr'

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

type Props = {
  filmList: FilmList[]
  hasMore: boolean
  getFixedOverview: (overview: string) => string
  loadMore: (page: number) => Promise<void>
  isFetching: boolean
}

const IndexView: FC<Props> = ({
  filmList,
  hasMore,
  getFixedOverview,
  loadMore,
  isFetching,
}) => {
  const { root, mt20, title } = useStyles()

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
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={!isFetching && hasMore}
      loader={loader}
      pageStart={1}
    >
      {items}
    </InfiniteScroll>
  )
}

export default IndexView
