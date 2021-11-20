import CreateIcon from '@mui/icons-material/Create'
import { Button, Divider, Skeleton, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { loadingReviewList3 } from 'common/test_mock/stabReviewData'
import { FiveStars } from 'components/UIKit/fiveStars'
import { FilmReviewList as FilmReviewListModel } from 'components/model/film/filmReviewList'
import { FilmReviewType } from 'types/film'

type Props = {
  isMobileSize: boolean
  averageStar: number | undefined
  reviewList: Partial<FilmReviewType>[] | undefined
}

const useStyles = makeStyles((theme: Theme) => ({
  flexItem: {
    flex: '1 1 33%',
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  mb1: {
    marginBottom: theme.spacing(1),
  },
  button: {
    fontSize: 14,
  },
}))

const FilmReviewList: FC<Props> = ({
  averageStar,
  isMobileSize,
  reviewList,
}) => {
  const { divider, mb1, button, flexItem } = useStyles()

  const reviewListToShow = !reviewList ? loadingReviewList3 : reviewList

  return (
    <>
      <Box display='flex' alignItems='center'>
        <Box className={flexItem}>
          {averageStar === undefined ? (
            <Skeleton height={80} />
          ) : (
            <>
              <Typography variant='h3' textAlign='center'>
                {averageStar}
              </Typography>
              <Box textAlign='center'>
                <FiveStars
                  {...{ value: averageStar, size: 'small', readonly: true }}
                />
              </Box>
            </>
          )}
        </Box>
        <Divider orientation='vertical' flexItem className={divider} />
        <Box className={flexItem}>
          {averageStar === undefined ? (
            <Skeleton height={80} />
          ) : (
            <>
              <Box textAlign='center' className={mb1}>
                <FiveStars {...{ value: averageStar, readonly: true }} />
              </Box>
              <Typography variant='caption' textAlign='center' component='p'>
                ↑星を選んで
              </Typography>
            </>
          )}
        </Box>
        <Divider orientation='vertical' flexItem className={divider} />
        <Box className={flexItem} textAlign='center'>
          {averageStar === undefined ? (
            <Skeleton height={80} />
          ) : (
            <Button endIcon={<CreateIcon />} className={button}>
              レビュー！
            </Button>
          )}
        </Box>
      </Box>
      <Box sx={{ m: 2 }} />
      <FilmReviewListModel
        {...{ isMobileSize, reviewList: reviewListToShow }}
      />
    </>
  )
}

export default FilmReviewList
