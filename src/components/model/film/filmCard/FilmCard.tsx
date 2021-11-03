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
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import Image from 'next/image'
import React, { FC } from 'react'
import useSize from 'hooks/useSize'
import { FilmInfo } from 'types/dto/ssr'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
})

// FilmInfoのプロパティにundefinedを足している
type Props = { [P in keyof FilmInfo]: FilmInfo[P] | undefined } & Partial<{
  handleClickCardBody: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
  handleClickFavoIcon: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}>

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
  handleClickCardBody = () => {},
  handleClickFavoIcon = () => {},
}) => {
  const { root, title: titleStyle } = useStyles()
  const { isMobileSize } = useSize()
  return (
    <Card className={root}>
      <CardActionArea onClick={handleClickCardBody}>
        <CardMedia title='Your title'>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 152,
            }}
          >
            {!backdrop_path && !poster_path ? (
              <Skeleton variant='rectangular' width='100%' height='100%' />
            ) : (
              <Image
                alt={title || original_title}
                src={`${TMDB_IMAGE_URL}${backdrop_path || poster_path}`}
                layout='fill'
                objectFit='cover'
              />
            )}
          </div>
        </CardMedia>
        {!isMobileSize && (
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='h2'
              className={titleStyle}
            >
              {!title && !original_title ? (
                <Skeleton height={32} width={'100%'} />
              ) : (
                title || original_title
              )}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {!overview ? (
                <Skeleton height={80} />
              ) : (
                getFixedOverview(overview)
              )}
            </Typography>
          </CardContent>
        )}
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
