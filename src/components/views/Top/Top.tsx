import { Box } from '@mui/material'
import React, { FC } from 'react'
import { useTop } from './useTop'
import { FilmModal } from 'components/model/film/filmModal'
import { HorizontalFilmListWithGenre } from 'components/organisms/film/HorizontalFilmListWithGenre'

type Props = {
  genreIds: number[]
  isMobileSize: boolean
}

const TopView: FC<Props> = ({ genreIds, isMobileSize }) => {
  const {
    currentFilm,
    filmModalOpen,
    toggleModal,
    handleClickFavoIcon,
    handleClickFilmCard,
  } = useTop()
  return (
    <>
      <Box p={1}>
        {genreIds.map((genreId) => {
          return (
            <Box key={genreId}>
              <HorizontalFilmListWithGenre
                {...{ genreId, isMobileSize, handleClickFilmCard }}
              />
            </Box>
          )
        })}
      </Box>
      {isMobileSize && currentFilm.id !== undefined && (
        <FilmModal
          {...currentFilm}
          open={filmModalOpen}
          toggleModal={toggleModal}
          handleClickFavoIcon={handleClickFavoIcon}
        />
      )}
    </>
  )
}

export default TopView
