import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useCallback } from 'react'
import { ArrowButton } from 'components/UIKit/ArrowButton'
import { VerticalFilmList } from 'components/model/film/VerticalFilmList'
import { useFilmListBySearch } from 'hooks/useFilmListBySearch'

type Props = {
  label: string
  genre?: string
  keyword?: string
}

const VerticalFilmListWithLabel: FC<Props> = ({ label, genre, keyword }) => {
  const {
    data: filmList,
    error,
    isLoading,
    size,
    setSize,
    isValidating,
  } = useFilmListBySearch({
    genre,
    keyword,
  })

  const loadMore = () => {
    console.log('size')
    console.log(size)
    setSize(size + 1)
  }

  return (
    <Box>
      <Typography gutterBottom variant='h6' fontWeight='bold' paddingLeft={1}>
        {label}
      </Typography>
      <VerticalFilmList
        {...{
          filmList,
          isValidating,
          loadMore,
        }}
      />
      <Box sx={{ m: 5 }} />
      <Box textAlign='center'>
        <ArrowButton direction='down' handleClick={loadMore} />
      </Box>
    </Box>
  )
}

export default VerticalFilmListWithLabel
