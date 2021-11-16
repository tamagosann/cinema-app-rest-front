import { Button, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { FC, useMemo } from 'react'
import { FiveStars } from 'components/UIKit/fiveStars'
import { UserIcon } from 'components/model/user/userIcon'

type Props = {
  isMobileSize: boolean
  userIconUrl: string
  username: string
  userIconColor: string
  star: number
  reviewTitle: string
  reviewDate: number
  overview: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  topRoot: {
    padding: theme.spacing(1),
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
  } = useStyles()

  const starToShow = useMemo(() => {
    return star.toFixed(1)
  }, [star])

  // TODO: ここは後でカスタムフック化する
  const reviewDateObject = new Date(reviewDate)
  const year = reviewDateObject.getFullYear()
  const month = reviewDateObject.getMonth() + 1
  const day = reviewDateObject.getDate()

  const reviewDateToShow = `${year}/${month}/${day}`

  return (
    <>
      <Box className={root}>
        <Box>
          <UserIcon
            width={isMobileSize ? 50 : 100}
            src={userIconUrl}
            alt={username}
            color={userIconColor}
          />
        </Box>
        <Box className={flex1}>
          <Box display='flex' className={topRoot}>
            <Box className={topItem}>
              <FiveStars
                value={star}
                readonly
                size={isMobileSize ? 'small' : 'medium'}
              />
            </Box>
            <Box className={topItemNumber}>{starToShow}</Box>
            <Box className={topItemNumber}>{`${reviewDateToShow} に投稿`}</Box>
          </Box>
          <Typography variant='caption' className={titleStyle}>
            {username} さん
          </Typography>
          <Typography variant='subtitle1' className={titleStyle}>
            {reviewTitle}
          </Typography>
          <Typography className={overviewStyle}>{overview}</Typography>
          <Button>続きを見る</Button>
        </Box>
      </Box>
    </>
  )
}

export default FilmReview
