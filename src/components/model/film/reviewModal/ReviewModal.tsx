import {
  Backdrop,
  Button,
  Fade,
  Modal,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { useReviewModal } from './useReviewModal'
import { FiveStars } from 'components/UIKit/fiveStars'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
}

const useStyles = makeStyles((theme: Theme) => ({
  topRoot: {
    padding: theme.spacing(1),
    alignItems: 'flex-end',
    paddingTop: 0,
  },
  topItem: {
    flex: '0 0 auto',
  },
  topItemNumber: {
    flex: '0 0 auto',
    marginLeft: 10,
  },
}))

type Props = {
  initialRating: number
  open: boolean
  handleClose: () => void
}

const ReviewModal: FC<Props> = ({ open, handleClose, initialRating }) => {
  const { topItem, topItemNumber, topRoot } = useStyles()
  const { ratingToShow, register, control, errors, submit, handleSubmit } =
    useReviewModal({
      initialRating,
    })

  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id='transition-modal-title'
              variant='h6'
              component='h2'
              sx={{ mb: 2 }}
            >
              映画名のレビューを作成
            </Typography>
            <form onSubmit={handleSubmit((data) => submit(data))}>
              <Box display='flex' className={topRoot} sx={{ mb: 2 }}>
                <Box className={topItem}>
                  <Controller
                    control={control}
                    name='rating'
                    defaultValue={initialRating}
                    render={({ field: { value, onChange } }) => {
                      return <FiveStars {...{ value, onChange }} />
                    }}
                  />
                </Box>
                <Box className={topItemNumber}>{ratingToShow}</Box>
              </Box>
              <TextField
                label='タイトル'
                {...register('title', {
                  required: '* タイトルは必須入力です',
                })}
                helperText={errors.title?.message}
                fullWidth
                multiline
                rows={1}
                error={!!errors.title}
                sx={{ mb: 2 }}
              />

              <TextField
                label='内容'
                {...register('detail', {
                  required: '* 内容は必須入力です',
                })}
                helperText={errors.detail?.message}
                fullWidth
                multiline
                rows={3}
                error={!!errors.detail}
                sx={{ mb: 2 }}
              />
              <Box textAlign='right'>
                <Button color='success' type='submit'>
                  投稿
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default ReviewModal
