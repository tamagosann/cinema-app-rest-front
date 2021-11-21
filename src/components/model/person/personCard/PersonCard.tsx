import { Skeleton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import Image from 'next/image'
import React, { FC } from 'react'
import { PersonData } from 'common/test_mock/stabPersonData'
import { getColorByGender } from 'common/userColor'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

const useStyles = makeStyles({
  root: {
    borderRadius: '50%',
    overflow: 'hidden',
  },
})

type Props = Partial<PersonData>

const PersonCard: FC<Props> = ({
  biography,
  birthday,
  gender,
  id,
  name,
  place_of_birth,
  profile_path,
}) => {
  const { root } = useStyles()
  const color = gender ? getColorByGender(gender) : getColorByGender(3)

  const style = {
    border: `4px solid ${color}`,
    borderRadius: '50%',
  }

  return (
    <>
      <Box width={100}>
        <Box className={root} width={100} height={100} style={style}>
          {!profile_path ? (
            <Skeleton variant='circular' width={100} height={100} />
          ) : (
            <Image
              src={`${TMDB_IMAGE_URL}${profile_path}`}
              alt={name}
              width={100}
              height={100}
              objectFit='cover'
              placeholder='blur'
              blurDataURL='/loading-image.jpg'
            />
          )}
        </Box>
        <Typography component='p' variant='h6' textAlign='center'>
          {!name ? <Skeleton height={64} /> : name}
        </Typography>
      </Box>
    </>
  )
}

export default PersonCard
