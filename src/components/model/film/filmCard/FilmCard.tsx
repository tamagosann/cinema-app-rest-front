import { Favorite as FavoriteIcon } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import React, { FC } from 'react'
import { FilmInfo } from 'types/dto/ssr'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

// FilmInfoのプロパティにundefinedを足している
type Props = { [P in keyof FilmInfo]: string | undefined } & {
  handleClickCardBody: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
  handleClickFavoIcon: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}

const getFixedOverview = (overview: string) => {
  if (overview.length <= 160) return overview
  const fixedOverView = overview.substr(0, 160) + '...'
  return fixedOverView
}

const FilmCard: FC<Props> = ({
  release_date,
  title,
  id,
  backdrop_path,
  genre_ids,
  poster_path,
  overview,
  original_title,
  handleClickCardBody,
  handleClickFavoIcon,
}) => {
  return (
    <Card>
      <CardActionArea onClick={handleClickCardBody}>
        <CardMedia title='Your title'>
          <div
            style={{
              position: 'relative',
              width: 321,
              height: 152,
            }}
          >
            <Image
              alt={title || original_title}
              src={`${TMDB_IMAGE_URL}${backdrop_path || poster_path}`}
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
            {title || original_title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {getFixedOverview(overview)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <IconButton onClick={handleClickFavoIcon}>
          <FavoriteIcon />
        </IconButton>
        <Typography>
          <Box component='span' p={2}>
            Favorite!
          </Box>
        </Typography>
      </CardActions>
    </Card>
  )
}

export default FilmCard
