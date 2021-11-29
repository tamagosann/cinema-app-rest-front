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
import { FilmInfo } from 'types/dto/ssr'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

const useStyles = makeStyles({
  rootMobile: {
    width: '100%',
    maxWidth: 200,
    height: (200 / 16) * 9,
  },
  rootPC: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  overview: {
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
})

// FilmInfoのプロパティにundefinedを足している
type Props = Partial<{ [P in keyof FilmInfo]: FilmInfo[P] | undefined }> & {
  isMobileSize: boolean
} & Partial<{
    handleClickFavoIcon: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => void
    handleClickFilmCard: (filmInfo: {
      [P in keyof FilmInfo]: FilmInfo[P] | undefined
    }) => void
    link?: (id: number) => void
  }>

const FilmCard: FC<Props> = ({
  isMobileSize,
  release_date,
  title,
  id,
  backdrop_path,
  genre_ids,
  poster_path,
  overview,
  original_title,
  handleClickFilmCard = () => {},
  handleClickFavoIcon = () => {},
  link,
}) => {
  const {
    rootMobile,
    rootPC,
    title: titleStyle,
    overview: overviewStyle,
  } = useStyles()
  const IdToPath = id as number
  return (
    <Card className={isMobileSize ? rootMobile : rootPC}>
      <CardActionArea
        onClick={
          !link
            ? () =>
                handleClickFilmCard({
                  release_date,
                  title,
                  id,
                  backdrop_path,
                  genre_ids,
                  poster_path,
                  overview,
                  original_title,
                  averageStar: 3,
                })
            : () => link(IdToPath)
        }
      >
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
                placeholder='blur'
                blurDataURL='/loading-image.jpg'
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
            {!overview ? (
              <Skeleton height={60} />
            ) : (
              <Typography
                variant='body2'
                color='textSecondary'
                component='p'
                className={overviewStyle}
              >
                {overview}
              </Typography>
            )}
          </CardContent>
        )}
      </CardActionArea>
      {isMobileSize ? (
        <></>
      ) : (
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
      )}
    </Card>
  )
}

export default FilmCard
