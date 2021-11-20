import { Chip, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import React, { FC } from 'react'
import { FilmInfo } from 'types/dto/ssr'
import { getGenreName, TMDB_IMAGE_URL } from 'utils/filmRequests'

type Props = { [P in keyof FilmInfo]: FilmInfo[P] | undefined } & {
  isMobileSize: boolean
}

const FilmDetail: FC<Props> = ({
  release_date,
  title,
  id,
  backdrop_path,
  genre_ids,
  poster_path,
  overview,
  original_title,
  isMobileSize,
}) => {
  const showingDate = !release_date
    ? undefined
    : release_date.replaceAll('-', '/')
  return (
    <>
      <Box>
        <Box
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: 'calc(9 / 16 * 100%)',
            overflow: 'hidden',
            borderRadius: 5,
          }}
        >
          {!backdrop_path && !poster_path ? (
            <Skeleton
              variant='rectangular'
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                maxWidth: '100%',
                height: '100%',
                maxHeight: '100%',
              }}
            />
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
        </Box>
        <Box sx={{ m: 1 }} />
        <Typography component='p' variant='h6' fontWeight='bold'>
          {!title && !original_title ? <Skeleton /> : title || original_title}
        </Typography>
        <Box sx={{ m: 1 }} />
        <Box>
          {!genre_ids ? (
            <Skeleton variant='rectangular' height={32} />
          ) : (
            genre_ids.map((id) => {
              const genreName = getGenreName(id)
              return (
                <Chip
                  label={genreName}
                  key={id}
                  color='primary'
                  sx={{ mr: 1 }}
                />
              )
            })
          )}
        </Box>
        <Box sx={{ m: 1 }} />
        <Typography component='p' variant='subtitle1'>
          {!showingDate ? <Skeleton /> : <>公開日：{showingDate}</>}
        </Typography>
        <Box sx={{ m: 1 }} />
        <Typography component='p' variant='body1'>
          {!overview ? (
            <Skeleton
              variant='rectangular'
              height={190}
              style={{ borderRadius: 5 }}
            />
          ) : (
            overview
          )}
        </Typography>
      </Box>
    </>
  )
}

export default FilmDetail
