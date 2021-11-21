import { Divider } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { FilmReview } from '../filmReveiw'
import { FilmReviewType } from 'types/film'

type Props = {
  isMobileSize: boolean
  reviewList: Partial<FilmReviewType>[]
}
// TODO: lastChildのdividerを消すcssを探す（useStylesでうまく動かないっぽい？）
const FilmReviewList: FC<Props> = ({ reviewList, isMobileSize }) => {
  return (
    <Box>
      {reviewList.map((review) => (
        <Box key={review.id}>
          <FilmReview {...review} {...{ isMobileSize }} />
          <Divider />
          <Box padding={1} />
        </Box>
      ))}
    </Box>
  )
}

export default FilmReviewList
