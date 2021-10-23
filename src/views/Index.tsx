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
import { borderLeft, borderRadius, maxWidth } from '@mui/system'
import Image from 'next/image'
import React, { FC, useState } from 'react'
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

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
  const { root, mt20, title, textField } = useStyles()

  const [search, setSearch] = useState<string>('')

  const handleChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearch(e.target.value)
  }

  const theme = useTheme()
  const [personName, setPersonName] = React.useState<string[]>([])
  console.log(personName)
  const handleChangeGenres = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setPersonName(
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
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={6} mr='auto' ml='auto'>
          <Box width='100%'>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel>genres</InputLabel>
              <Select
                multiple
                value={personName}
                onChange={handleChangeGenres}
                input={<OutlinedInput label='Name' />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
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
            <IconButton style={{ width: '100%', height: '100%' }}>
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

export default IndexView
