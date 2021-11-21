import { Box } from '@mui/system'
import React, { FC } from 'react'
import { FilmDetail } from 'components/model/film/filmDetail'
import { FilmReviewListWithTop } from 'components/organisms/film/FilmReviewListWithTop'
import { FilmInfo } from 'types/dto/ssr'

type Props = FilmInfo & { averageStar: number; isMobileSize: boolean }

const FilmId: FC<Props> = (props) => {
  const { id: filmId, averageStar, isMobileSize } = props
  return (
    <>
      <Box sx={{ m: 2 }} />
      <FilmDetail {...{ ...props }} />
      <Box sx={{ m: 2 }} />
      <FilmReviewListWithTop {...{ isMobileSize, averageStar, filmId }} />
      <Box sx={{ m: 2 }} />
    </>
  )
}

export default FilmId
