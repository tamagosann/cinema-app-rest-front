import { useState, useCallback } from 'react'
import { FilmInfo } from 'types/dto/ssr'

export const useTop = () => {
  const [currentFilm, setCurrentFilm] = useState<{
    [P in keyof FilmInfo]: FilmInfo[P] | undefined
  }>({
    release_date: undefined,
    title: undefined,
    id: undefined,
    backdrop_path: undefined,
    genre_ids: undefined,
    poster_path: undefined,
    overview: undefined,
    original_title: undefined,
  })

  const [filmModalOpen, setFilmModalOpen] = useState(false)

  const toggleModal = useCallback(
    (newOpen: boolean) => {
      setFilmModalOpen(newOpen)
    },
    [setFilmModalOpen],
  )

  const handleClickFavoIcon = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {},
    [],
  )

  const handleClickFilmCard = (filmInfo: {
    [P in keyof FilmInfo]: FilmInfo[P] | undefined
  }) => {
    setCurrentFilm({ ...filmInfo })
    setFilmModalOpen(true)
  }

  return {
    currentFilm,
    filmModalOpen,
    toggleModal,
    handleClickFavoIcon,
    handleClickFilmCard,
  }
}
