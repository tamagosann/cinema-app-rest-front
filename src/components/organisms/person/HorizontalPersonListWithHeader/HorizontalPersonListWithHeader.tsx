import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback } from 'react'
import { HorizontalPersonCardList } from 'components/model/person/horizontalPersonCardList'
import { usePersonList } from 'hooks/usePersonList'

const HorizontalPersonListWithHeader = () => {
  const {
    data: personList,
    error,
    size,
    setSize,
    isValidating,
  } = usePersonList({})

  const loadMore = useCallback(() => setSize(size + 1), [size, setSize])

  return (
    <>
      <Box>
        <Typography component='p' variant='h5' fontWeight='bold'>
          Famous Film Actors
        </Typography>
        <HorizontalPersonCardList {...{ personList, isValidating, loadMore }} />
      </Box>
    </>
  )
}

export default HorizontalPersonListWithHeader
