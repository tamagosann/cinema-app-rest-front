import { Global } from '@emotion/react'
import { Favorite } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Skeleton from '@mui/material/Skeleton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import Image from 'next/image'
import React, { FC } from 'react'
import { FilmInfo } from 'types/dto/ssr'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

const useStyles = makeStyles({
  title: {
    width: '100%',
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  overview: {
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  imgBox: {
    width: '100%',
    paddingTop: '56.25%',
    position: 'relative',
    backgroundColor: '#FFF',
  },
  imgBoxInside: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  actionBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
})

type Props = { [P in keyof FilmInfo]: FilmInfo[P] | undefined } & {
  open: boolean
  toggleModal: (newOpen: boolean) => void
  handleClickFavoIcon: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}

const drawerBleeding = 56

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: '#FFF',
}))

const StyledBox = styled(Box)(({ theme }) => ({ backgroundColor: '#FFF' }))

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}))

const FilmModal: FC<Props> = ({
  release_date,
  title,
  id,
  backdrop_path,
  genre_ids,
  poster_path,
  overview,
  original_title,
  open,
  toggleModal,
  handleClickFavoIcon,
}) => {
  const {
    title: titleStyle,
    overview: overviewStyle,
    imgBox,
    imgBoxInside,
    actionBox,
  } = useStyles()
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor='bottom'
        open={open}
        onClose={() => toggleModal(false)}
        onOpen={() => toggleModal(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography
            sx={{ p: 2, color: 'text.secondary' }}
            className={titleStyle}
          >
            {title || original_title}
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            width: '100%',
          }}
        >
          <Box className={imgBox}>
            {backdrop_path || poster_path ? (
              <Box className={imgBoxInside}>
                <Image
                  alt={title || original_title}
                  src={`${TMDB_IMAGE_URL}${backdrop_path || poster_path}`}
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL='/loading-image.jpg'
                />
              </Box>
            ) : (
              <Box className={imgBoxInside}>
                <Skeleton variant='rectangular' height='100%' />
              </Box>
            )}
          </Box>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
          }}
        >
          <Typography className={overviewStyle}>{overview}</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
          }}
        >
          <Box className={actionBox}>
            <IconButton onClick={handleClickFavoIcon}>
              <Favorite />
            </IconButton>
            <Typography>
              <Box component='span' p={2}>
                Favorite!
              </Box>
            </Typography>
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  )
}

export default FilmModal
