import { Typography, Box } from '@mui/material'
import React, { FC } from 'react'
import { HorizontalFilmList } from 'components/model/film/HorizontalFilmList'
import { useFilmList } from 'hooks/useFilmList'
import { FilmInfo } from 'types/dto/ssr'
import { getGenreName } from 'utils/filmRequests'

type Props = {
  genreId: number
  isMobileSize: boolean
}

const HorizontalFilmListWithGenre: FC<Props> = ({ genreId, isMobileSize }) => {
  const { count, data: filmList, error } = useFilmList({ genreId })
  const genreName = getGenreName(genreId)
  console.log(filmList)

  if (error) return <Box>Error occered</Box>
  return (
    <Box>
      <Typography gutterBottom variant='h6' fontWeight='bold' paddingLeft={1}>
        {genreName ? genreName : 'ジャンル名'}
      </Typography>
      <HorizontalFilmList {...{ filmList, isMobileSize }} />
    </Box>
  )
}

export default HorizontalFilmListWithGenre
