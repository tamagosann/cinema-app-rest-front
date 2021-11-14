import { Typography, Box } from '@mui/material'
import React, { FC, useCallback } from 'react'
import { HorizontalFilmList } from 'components/model/film/HorizontalFilmList'
import { useFilmList } from 'hooks/useFilmList'
import { FilmInfo } from 'types/dto/ssr'
import { getGenreName } from 'utils/filmRequests'

type Props = {
  genreId: number
  isMobileSize: boolean
  handleClickFilmCard: (filmInfo: {
    [P in keyof FilmInfo]: FilmInfo[P] | undefined
  }) => void
  index: number
}

const HorizontalFilmListWithGenre: FC<Props> = ({
  genreId,
  isMobileSize,
  handleClickFilmCard,
  index,
}) => {
  const {
    count,
    data: filmList,
    error,
    size,
    setSize,
    isValidating,
  } = useFilmList({ genreId })

  const genreName = getGenreName(genreId)
  console.log(filmList)

  const handleClickLoadMoreButton = useCallback(
    () => setSize(size + 1),
    [size, setSize],
  )

  if (error) return <Box>Error occered</Box>
  return (
    <Box>
      <Typography gutterBottom variant='h6' fontWeight='bold' paddingLeft={1}>
        {genreName ? genreName : 'ジャンル名'}
      </Typography>
      <HorizontalFilmList
        {...{
          filmList,
          isMobileSize,
          handleClickFilmCard,
          handleClickLoadMoreButton,
          index,
          isValidating,
        }}
      />
    </Box>
  )
}

export default HorizontalFilmListWithGenre
