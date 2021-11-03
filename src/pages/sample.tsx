import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { FC } from 'react'
import { requests } from '../utils/filmRequests'
import { BASE_URL } from 'common/urls'

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  mt20: {
    marginTop: 0,
  },
})

const IndexPage: FC<ServerSideProps> = ({ results }) => {
  const { root, mt20 } = useStyles()
  console.log(results)

  const getFixedOverview = (overview: string) => {
    if (overview.length <= 160) return overview
    const fixedOverView = overview.substr(0, 160) + '...'
    return fixedOverView
  }

  return (
    <>
      <Grid
        container
        spacing={3}
        alignItems='center'
        justifyContent='center'
        className={mt20}
      >
        {results.map((result: any) => {
          console.log(
            `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
              `${BASE_URL}${result.poster_path}`,
          )
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
                    <Typography gutterBottom variant='h5' component='h2'>
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

  const request = await fetch(`https://api.themoviedb.org/3${requestUrl}`).then(
    (res) => res.json(),
  )

  console.log(request)

  return {
    props: {
      results: request.results,
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
