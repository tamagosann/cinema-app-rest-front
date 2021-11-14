import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { FC, useRef, useEffect } from 'react'
import { FilmCard } from '../filmCard'
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
  filmList: (FilmInfo | undefined)[] | undefined
  isMobileSize?: boolean
  handleClickFilmCard: (filmInfo: {
    [P in keyof FilmInfo]: FilmInfo[P] | undefined
  }) => void
  handleClickLoadMoreButton: () => Promise<any[] | undefined>
  index: number
  isValidating: boolean
}

const HorizontalFilmList: FC<Props> = ({
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

  const onScroll = (e: React.UIEvent<React.ReactNode>) => {
    // as HTMLDivElement としないとtype errorになる
    const target = e.target as HTMLDivElement

    const scrollRight =
      target.scrollWidth - (target.scrollLeft + target.clientWidth)

    // filmListがundefined、つまり読み込み時かエラー時にはreturnさせないとブラウザの負荷がやばくなる。
    if (filmList === undefined || filmList[0] === undefined) return

    // validation中（新規でfetch中も発動させない）
    if (isValidating) return

    if (isMobileSize) {
      if (scrollRight < 500) handleClickLoadMoreButton()
    } else {
      if (scrollRight < 900) handleClickLoadMoreButton()
    }
  }

  return (
    <Box className={filmCardListRoot}>
      <Box className={filmCardListStyle} ref={ref} onScroll={onScroll}>
        {!!filmList &&
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
          })}
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
