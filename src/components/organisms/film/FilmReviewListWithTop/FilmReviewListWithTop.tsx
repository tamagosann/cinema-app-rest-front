import CreateIcon from '@mui/icons-material/Create'
import {
  Button,
  Divider,
  Pagination,
  Skeleton,
  Theme,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { FC, useState } from 'react'
import { loadingReviewList3 } from 'common/test_mock/stabReviewData'
import { FiveStars } from 'components/UIKit/fiveStars'
import { FilmReviewList as FilmReviewListModel } from 'components/model/film/filmReviewList'
import { ReviewModal } from 'components/model/film/reviewModal'
import { useFilmReviewList } from 'hooks/useReviewList'

type Props = {
  isMobileSize: boolean
  averageStar: number | undefined
  // reviewList: Partial<FilmReviewType>[] | undefined
  filmId: number
}

const FilmReviewListWithTop: FC<Props> = ({
  averageStar,
  isMobileSize,
  filmId,
}) => {
  const {
    error,
    totalPage,
    data: reviewList,
    totalResults,
    page,
    setPage,
  } = useFilmReviewList({ filmId })

  const [starsSelected, setStarsSelected] = useState(averageStar || 3)
  const [openReviewModal, setOpenReviewModal] = useState(false)
  const starsOnChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => setStarsSelected(newValue as number)

  const handleOpenReviewModal = () => setOpenReviewModal(true)
  const handleCloseReviewModal = () => setOpenReviewModal(false)

  const reviewListToShow = !reviewList ? loadingReviewList3 : reviewList

  return (
    <>
      <Box display='flex' alignItems='center'>
        <Box sx={{ flex: '1 1 33%' }}>
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
        <Divider orientation='vertical' flexItem sx={{ ml: 1, mr: 1 }} />
        <Box sx={{ flex: '1 1 33%' }}>
          {averageStar === undefined ? (
            <Skeleton height={80} />
          ) : (
            <>
              <Box textAlign='center' sx={{ mb: 1 }}>
                <FiveStars
                  {...{ value: starsSelected, onChange: starsOnChange }}
                />
              </Box>
              <Typography variant='caption' textAlign='center' component='p'>
                ↑星を選んで
              </Typography>
            </>
          )}
        </Box>
        <Divider orientation='vertical' flexItem sx={{ ml: 1, mr: 1 }} />
        <Box sx={{ flex: '1 1 33%' }} textAlign='center'>
          {averageStar === undefined ? (
            <Skeleton height={80} />
          ) : (
            <Button
              onClick={handleOpenReviewModal}
              endIcon={<CreateIcon />}
              sx={{ fontSize: 14 }}
            >
              レビュー！
            </Button>
          )}
        </Box>
      </Box>
      <Box sx={{ m: 2 }} />
      <FilmReviewListModel
        {...{ isMobileSize, reviewList: reviewListToShow }}
      />
      <Box textAlign='center'>
        <Pagination
          color='primary'
          sx={{
            '& > ul': {
              justifyContent: 'center',
            },
          }}
          count={totalPage}
          size={isMobileSize ? 'small' : 'medium'}
          page={page}
          onChange={(e, page) => setPage(page)}
        />
      </Box>
      <ReviewModal
        {...{
          open: openReviewModal,
          handleClose: handleCloseReviewModal,
          initialRating: starsSelected,
        }}
      />
    </>
  )
}

export default FilmReviewListWithTop
