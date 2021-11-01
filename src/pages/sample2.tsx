import ClearIcon from '@mui/icons-material/Clear'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SavedSearchIcon from '@mui/icons-material/SavedSearch'
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
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
  Theme,
  useTheme,
  TextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import React, { FC, useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { FilmList, TopSsrDto } from 'types/dto/ssr'
import {
  TMDB_IMAGE_URL,
  TMDB_HOST,
  DISCOVER_FILM_URL,
  Genre,
} from 'utils/filmRequests'
import { genres, requests } from 'utils/filmRequests'

const totalPage = 1000

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
  textField: {
    width: '100%',
    [`& fieldset`]: {
      borderRadius: '4px 0 0 4px',
    },
  },
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(genreName: string, genres: Genre[], theme: Theme) {
  return {
    fontWeight:
      genres.find((_genre) => _genre.genreName === genreName) === undefined
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const getQueryFromString = (genreNames: string[]) => {
  const genreIds = genreNames.map((genreName) => {
    return genres.find((genre) => genre.genreName === genreName)?.id
  }) as number[]
  return genreIds.length > 0
    ? genreIds.map((id) => `genre=${id}`).join('&')
    : ''
}

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>

const IndexPage: FC<ServerSideProps> = (props) => {
  const { filmList: filmListFromProps } = props
  const [filmList, setFilmList] = useState<any[]>(filmListFromProps)
  const [hasMore, setHasMore] = useState(true) //再読み込み判定
  const [isFetching, setIsFetching] = useState(false)
  const { query, push, replace } = useRouter()

  useEffect(() => {
    setFilmList(filmListFromProps)
  }, [filmListFromProps])

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

  const { root, mt20, title, textField } = useStyles()

  const [search, setSearch] = useState<string>('')

  const handleChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearch(e.target.value)
  }

  const handleClickSearchButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.log('おされgた')
  }

  const theme = useTheme()

  const [selectedGenreNames, setSelectedGenreNames] = React.useState<string[]>(
    [],
  )

  const handleChangeGenresSelected = (
    event: SelectChangeEvent<typeof selectedGenreNames>,
  ) => {
    const {
      target: { value },
    } = event
    setSelectedGenreNames(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
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
                        `${TMDB_IMAGE_URL}${
                          result.backdrop_path || result.poster_path
                        }` || `${TMDB_IMAGE_URL}${result.poster_path}`
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
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={6} mr='auto' ml='auto'>
          <Box width='100%'>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel>genres</InputLabel>
              <Select
                multiple
                value={selectedGenreNames}
                onChange={handleChangeGenresSelected}
                onClose={() => {
                  console.log('きた＿')
                  replace(
                    `/?${getQueryFromString(
                      selectedGenreNames,
                    )}&search=${search}`,
                  )
                }}
                input={<OutlinedInput label='Name' />}
                MenuProps={MenuProps}
              >
                {genres.map(({ genreName }) => (
                  <MenuItem
                    key={genreName}
                    value={genreName}
                    style={getStyles(genreName, genres, theme)}
                  >
                    {genreName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} mr='auto' ml='auto' display='flex'>
          <Box className={textField}>
            <TextField
              id='outlined-basic'
              label='search'
              variant='outlined'
              value={search}
              fullWidth={true}
              onChange={handleChangeSearch}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setSearch('')} disabled={!search}>
                    <ClearIcon color='disabled' fontSize='small' />
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Box
            style={{
              border: '1px solid rgba(0, 0, 0, 0.23)',
              borderLeft: 'none',
              borderRadius: '0 4px 4px 0',
              width: 56,
              flex: '0 0 auto',
            }}
          >
            <IconButton
              style={{ width: '100%', height: '100%' }}
              onClick={handleClickSearchButton}
            >
              <SavedSearchIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
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
    query: { genre = '', search = '' },
  } = context
  console.log('genre')
  console.log(genre)
  console.log('search')
  console.log(search)

  let genreQuery: string
  if (!genre) {
    genreQuery = ''
  } else if (Array.isArray(genre)) {
    console.log(genre)
    genreQuery = `with_genres=${genre.join(',')}`
  } else {
    genreQuery = `with_genres=${genre}`
  }

  const requestUrl = `${TMDB_HOST}${DISCOVER_FILM_URL}${
    !!genreQuery || !!search ? '&' : ''
  }${genreQuery}${
    search ? `${genreQuery ? '&' : ''}with_keywords=${search}` : ''
  }`

  console.log(requestUrl)

  const { results: filmList } = await fetch(encodeURI(requestUrl)).then(
    (res) => {
      return res.json()
    },
  )

  return {
    props: {
      filmList,
    },
  }
}
