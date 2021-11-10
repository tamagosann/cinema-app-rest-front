import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { FC, useRef, useEffect } from 'react'
import { FilmCard } from '../filmCard'
import { ArrowButton } from 'components/UIKit/ArrowButton'
import { FilmInfo } from 'types/dto/ssr'

const useStyles = makeStyles((theme) => ({
  filmCardListRoot: {
    width: '100%',
  },
  filmCardListStyle: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    overflowX: 'scroll',
  },
  filmCardBoxMobile: {
    padding: 8,
    width: 200,
    maxWidth: '100%',
    flex: '0 0 auto',
  },
  filmCardBoxPC: {
    padding: 8,
    width: 400,
    maxWidth: '100%',
    flex: '0 0 auto',
  },
}))

const skeletonFilmCardProps = {
  release_date: undefined,
  title: undefined,
  id: undefined,
  backdrop_path: undefined,
  genre_ids: undefined,
  poster_path: undefined,
  overview: undefined,
  original_title: undefined,
}

type Props = {
  filmList: FilmInfo[] | undefined
  isMobileSize?: boolean
  handleClickFilmCard: (filmInfo: {
    [P in keyof FilmInfo]: FilmInfo[P] | undefined
  }) => void
  handleClickLoadMoreButton: () => Promise<any[] | undefined>
  index: number
}

const HorizontalFilmList: FC<Props> = ({
  filmList,
  isMobileSize = false,
  handleClickFilmCard,
  handleClickLoadMoreButton,
  index,
}) => {
  const {
    filmCardListRoot,
    filmCardBoxMobile,
    filmCardBoxPC,
    filmCardListStyle,
  } = useStyles()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      ref === null ||
      ref.current === null ||
      !index ||
      index % 2 === 0 ||
      index === 0
    )
      return
    ref.current.scrollLeft = 100
  }, [filmList, index, ref])

  return (
    <Box className={filmCardListRoot}>
      <Box className={filmCardListStyle} ref={ref}>
        {!!filmList &&
          !!filmList[0] &&
          filmList.length > 0 &&
          filmList.map((filmInfo) => {
            return (
              <Box
                key={filmInfo.id}
                className={`${
                  isMobileSize ? filmCardBoxMobile : filmCardBoxPC
                }`}
              >
                <FilmCard
                  {...filmInfo}
                  {...{ isMobileSize, handleClickFilmCard }}
                />
              </Box>
            )
          })}
        {!filmList ||
          (filmList[0] === undefined &&
            [...Array(20)].map((_: undefined, index: number) => {
              return (
                <Box
                  key={index}
                  className={isMobileSize ? filmCardBoxMobile : filmCardBoxPC}
                >
                  <FilmCard
                    {...skeletonFilmCardProps}
                    {...{ isMobileSize, handleClickFilmCard }}
                  />
                </Box>
              )
            }))}
        <ArrowButton handleClick={handleClickLoadMoreButton} />
      </Box>
    </Box>
  )
}

export default HorizontalFilmList
