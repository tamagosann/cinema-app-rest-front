import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { HorizontalFilmList } from 'components/model/film/HorizontalFilmList'
import { FilmReviewList } from 'components/model/film/filmReviewList'
import { HorizontalPersonCardList } from 'components/model/person/horizontalPersonCardList'
import { UserDetail } from 'components/model/user/userDetail'
import { UserPageDto } from 'types/dto/userPageDto'

type Props = Partial<UserPageDto>
const UserPageView: FC<Props> = ({
  userId,
  username,
  icon,
  iconColor,
  favoriteFilms,
  favoritePeople,
  reviews,
}) => {
  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box sx={(theme) => ({ position: 'sticky', top: theme.spacing(2) })}>
            <UserDetail
              {...{
                username,
                icon,
                iconColor,
                favoriteFilms,
                favoritePeople,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography
                gutterBottom
                variant='h6'
                fontWeight='bold'
                paddingLeft={1}
              >
                {!favoritePeople || favoritePeople.length === 0
                  ? 'お気に入りの俳優がまだいないようです、、、'
                  : 'お気に入りの俳優'}
              </Typography>
              {!!favoritePeople && favoritePeople.length > 0 && (
                <HorizontalPersonCardList
                  {...{ personList: favoritePeople, isValidating: false }}
                />
              )}
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography
                gutterBottom
                variant='h6'
                fontWeight='bold'
                paddingLeft={1}
              >
                {!favoriteFilms || favoriteFilms.length === 0
                  ? 'お気に入りの映画がまだ無いようです、、、'
                  : 'お気に入りの映画'}
              </Typography>
              {favoriteFilms && favoriteFilms.length > 0 && (
                <HorizontalFilmList
                  {...{
                    filmList: favoriteFilms,
                    isMobileSize: true,
                    handleClickFilmCard: () => {},
                    index: 0,
                    isValidating: false,
                  }}
                />
              )}
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant='h6'
                fontWeight='bold'
                paddingLeft={1}
              >
                {!reviews || reviews.length === 0
                  ? 'まだレビューを書いてない無いようです、、、'
                  : 'レビュー一覧'}
              </Typography>
              {reviews && reviews.length > 0 && (
                <FilmReviewList
                  {...{
                    reviewList: reviews,
                    isMobileSize: true,
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserPageView
