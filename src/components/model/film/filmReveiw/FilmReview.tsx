import { Button, Skeleton, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import React, { FC, useState } from 'react'
import useFilmReview from './FilmReview.hooks'
import { FiveStars } from 'components/UIKit/fiveStars'
import { UserIcon } from 'components/model/user/userIcon'
import { FilmReviewType } from 'types/film'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

type Props = Partial<FilmReviewType> & {
  isMobileSize: boolean
}

const Title = styled(Typography)({
  padding: 1,
  paddingTop: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})

const Overview = styled(Typography)({
  padding: 1,
  paddingTop: 0,
  paddingBottom: 0,
  marginBottom: 1,
  display: '-webkit-box',
  '-webkit-line-clamp': 3,
  '-webkit-box-orient': 'vertical',
})

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
  const { starToShow, reviewDateToShow } = useFilmReview({
    star,
    reviewDate,
  })

  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <Box sx={{ display: 'flex', mb: 1 }}>
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
        <Box sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
          <Box
            display='flex'
            sx={{
              padding: 1,
              alignItems: 'flex-end',
              paddingTop: 0,
            }}
          >
            {!star || !starToShow || !reviewDate ? (
              <Skeleton width='100%' height={isMobileSize ? 24 : 27} />
            ) : (
              <>
                <Box sx={{ flex: '0 0 auto' }}>
                  <FiveStars
                    value={star}
                    readonly
                    size={isMobileSize ? 'small' : 'medium'}
                  />
                </Box>
                <Box sx={{ flex: '0 0 auto', marginLeft: 10 }}>
                  {starToShow}
                </Box>
                <Box
                  sx={{ flex: '0 0 auto', marginLeft: 10 }}
                >{`${reviewDateToShow} に投稿`}</Box>
              </>
            )}
          </Box>
          {username ? (
            <Title variant='caption'>{username}　さん</Title>
          ) : (
            <Skeleton width={50} component='span' style={{ marginLeft: 8 }} />
          )}
          {!reviewTitle ? (
            <Title variant='subtitle1'>
              <Skeleton height={28} component='div' />
            </Title>
          ) : (
            <Title variant='subtitle1'>{reviewTitle}</Title>
          )}
          {!overview ? (
            <Overview height={72}>
              <Skeleton height={'100%'} />
            </Overview>
          ) : (
            <Overview
              style={{
                display: showDetail ? 'block' : '-webkit-box',
                WebkitLineClamp: showDetail ? 'none' : 3,
                overflow: showDetail ? 'auto' : 'hidden',
              }}
            >
              {overview}
            </Overview>
          )}
          <Button onClick={() => setShowDetail(!showDetail)}>続きを見る</Button>
        </Box>
      </Box>
    </>
  )
}

export default FilmReview
