import { Box } from '@mui/system'
import React, { FC } from 'react'
import { FilmDetail } from 'components/model/film/filmDetail'
import { FilmReviewListWithTop } from 'components/organisms/film/FilmReviewListWithTop'
import { FilmInfo } from 'types/dto/ssr'

type Props = FilmInfo & { averageStar: number; isMobileSize: boolean }

const FilmId: FC<Props> = (props) => {
  //filmの平均点、写真、説明などははssrで取ってこよう。
  const { id: filmId, averageStar, isMobileSize } = props
  return (
    <>
      <FilmDetail {...{ ...props }} />
      <Box sx={{ m: 2 }} />
      <FilmReviewListWithTop {...{ isMobileSize, averageStar, filmId }} />
    </>
  )
}

export default FilmId
