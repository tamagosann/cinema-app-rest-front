import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { FC } from 'react'
import { HorizontalFilmListWithGenre } from 'components/organisms/film/HorizontalFilmListWithGenre'

type Props = {
  genreIds: number[]
  isMobileSize: boolean
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

const TopView: FC<Props> = ({ genreIds, isMobileSize }) => {
  return (
    <Box p={1}>
      {genreIds.map((genreId) => {
        return (
          <Box key={genreId}>
            <HorizontalFilmListWithGenre {...{ genreId, isMobileSize }} />
          </Box>
        )
      })}
    </Box>
  )
}

export default TopView
