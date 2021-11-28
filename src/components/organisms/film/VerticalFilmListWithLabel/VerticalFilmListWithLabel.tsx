import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useCallback, useMemo } from 'react'
import { ArrowButton } from 'components/UIKit/ArrowButton'
import { VerticalFilmList } from 'components/model/film/VerticalFilmList'
import { useFilmListBySearch } from 'hooks/useFilmListBySearch'
import { getGenreNames } from 'utils/filmRequests'

type Props = {
  genre?: string
  keyword?: string
}

const VerticalFilmListWithLabel: FC<Props> = ({ genre, keyword }) => {
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

  const label = useMemo(() => {
    if (!!genre) {
      return `Now Searching for Genre ${getGenreNames(genre)}`
    } else if (!!keyword) {
      return `Now Searching for keyword "${keyword}"`
    } else {
      return `Recent Films`
    }
  }, [genre, keyword])

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
