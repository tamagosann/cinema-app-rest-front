import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { FC, useRef, useEffect, CSSProperties } from 'react'
import { FixedSizeList as List } from 'react-window'
import { FilmCard } from '../filmCard'
import useHorizontalFilmList from './useHorizontalFilmList'
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

export type HorizontalFilmListProps = {
  filmList: (FilmInfo | undefined)[] | undefined
  isMobileSize?: boolean
  handleClickFilmCard: (filmInfo: {
    [P in keyof FilmInfo]: FilmInfo[P] | undefined
  }) => void
  handleClickLoadMoreButton: () => Promise<any[] | undefined>
  index: number
  isValidating: boolean
}

const HorizontalFilmList: FC<HorizontalFilmListProps> = ({
  filmList,
  isMobileSize = false,
  handleClickFilmCard,
  handleClickLoadMoreButton,
  index,
  isValidating,
}) => {
  const {
    filmCardListRoot,
    filmCardBoxMobile,
    filmCardBoxPC,
    filmCardListStyle,
  } = useStyles()

  const { ref, onScroll } = useHorizontalFilmList({
    filmList,
    isMobileSize,
    handleClickFilmCard,
    handleClickLoadMoreButton,
    index,
    isValidating,
  })

  const Row = ({
    index,
    style,
    data,
  }: {
    index: number
    style: CSSProperties
    data: {
      filmList: {
        [P in keyof FilmInfo]: FilmInfo[P] | undefined
      }[]
      isMobileSize: boolean
      handleClickFilmCard: (filmInfo: {
        [P in keyof FilmInfo]: FilmInfo[P] | undefined
      }) => void
    }
  }) => {
    const { filmList, isMobileSize, handleClickFilmCard } = data
    const filmInfo = filmList[index]
    return (
      <Box
        key={filmInfo?.id || index}
        className={`${isMobileSize ? filmCardBoxMobile : filmCardBoxPC}`}
        style={style}
      >
        <FilmCard
          {...(filmInfo as FilmInfo)}
          {...{ isMobileSize, handleClickFilmCard }}
        />
      </Box>
    )
  }

  return (
    <Box className={filmCardListRoot}>
      <Box className={filmCardListStyle}>
        {!!filmList && filmList.length > 0 && (
          <List
            height={112.5 + 16}
            itemCount={filmList.length}
            itemSize={200}
            width={366}
            layout='horizontal'
            itemData={{
              filmList: filmList as FilmInfo[],
              isMobileSize,
              handleClickFilmCard,
            }}
            onScroll={onScroll}
          >
            {Row}
          </List>
        )}

        {/* {!!filmList &&
          !!filmList[0] &&
          filmList.length > 0 &&
          filmList.map((filmInfo, index) => {
            return (
              <Box
                key={filmInfo?.id || index}
                className={`${
                  isMobileSize ? filmCardBoxMobile : filmCardBoxPC
                }`}
              >
                <FilmCard
                  {...(filmInfo as FilmInfo)}
                  {...{ isMobileSize, handleClickFilmCard }}
                />
              </Box>
            )
          })} */}
        {(!filmList || filmList[0] === undefined || isValidating) &&
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
          })}
      </Box>
    </Box>
  )
}

export default HorizontalFilmList
