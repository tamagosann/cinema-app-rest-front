import { Button, Skeleton, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { FC, useMemo, useState } from 'react'
import useFilmReview from './FilmReview.hooks'
import { FiveStars } from 'components/UIKit/fiveStars'
import { UserIcon } from 'components/model/user/userIcon'
import { FilmReviewType } from 'types/film'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

type Props = Partial<FilmReviewType> & {
  isMobileSize: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  topRoot: {
    padding: theme.spacing(1),
    alignItems: 'flex-end',
    paddingTop: 0,
  },
  topItem: {
    flex: '0 0 auto',
  },
  flex1: {
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  topItemNumber: {
    flex: '0 0 auto',
    marginLeft: 10,
  },
  topItemTitle: {
    flex: '0 0 auto',
    marginLeft: 10,
  },
  userIcon: {
    flex: '0 0 auto',
  },
  title: {
    padding: theme.spacing(1),
    paddingTop: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  overview: {
    padding: theme.spacing(1),
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: theme.spacing(1),
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    transition: 'height 1s ease-out',
  },
  overviewShow: {
    padding: theme.spacing(1),
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: theme.spacing(1),
    display: 'block',
    '-webkit-line-clamp': 'none',
    overflow: 'auto',
  },
}))

const FilmReview: FC<Props> = ({
  isMobileSize,
  userIconUrl,
  username,
  userIconColor,
  star,
  reviewTitle,
  reviewDate,
  overview,
}) => {
  const {
    root,
    topItem,
    topItemNumber,
    topRoot,
    title: titleStyle,
    flex1,
    overview: overviewStyle,
    overviewShow,
  } = useStyles()

  const { starToShow, reviewDateToShow } = useFilmReview({
    star,
    reviewDate,
  })

  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <Box className={root}>
        <Box>
          {!userIconUrl ? (
            <Skeleton
              width={isMobileSize ? 50 : 100}
              height={isMobileSize ? 50 : 100}
              variant='circular'
            />
          ) : (
            <UserIcon
              width={isMobileSize ? 50 : 100}
              src={`${TMDB_IMAGE_URL}${userIconUrl}`}
              alt={username as string}
              color={userIconColor ? userIconColor : 'black'}
            />
          )}
        </Box>
        <Box className={flex1}>
          <Box display='flex' className={topRoot}>
            {!star || !starToShow || !reviewDate ? (
              <Skeleton width='100%' height={isMobileSize ? 24 : 27} />
            ) : (
              <>
                <Box className={topItem}>
                  <FiveStars
                    value={star}
                    readonly
                    size={isMobileSize ? 'small' : 'medium'}
                  />
                </Box>
                <Box className={topItemNumber}>{starToShow}</Box>
                <Box
                  className={topItemNumber}
                >{`${reviewDateToShow} に投稿`}</Box>
              </>
            )}
          </Box>
          {username ? (
            <Typography variant='caption' className={titleStyle}>
              {username}　さん
            </Typography>
          ) : (
            <Skeleton width={50} component='span' style={{ marginLeft: 8 }} />
          )}
          {!reviewTitle ? (
            <Typography variant='subtitle1' className={titleStyle}>
              <Skeleton height={28} component='div' />
            </Typography>
          ) : (
            <Typography variant='subtitle1' className={titleStyle}>
              {reviewTitle}
            </Typography>
          )}
          {!overview ? (
            <Typography className={overviewStyle} height={72}>
              <Skeleton height={'100%'} />
            </Typography>
          ) : (
            <Typography
              className={`${overviewStyle} ${showDetail && overviewShow}`}
            >
              {overview}
            </Typography>
          )}
          <Button onClick={() => setShowDetail(!showDetail)}>続きを見る</Button>
        </Box>
      </Box>
    </>
  )
}

export default FilmReview
