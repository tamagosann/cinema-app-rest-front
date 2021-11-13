import React, { useRef, useEffect, useState } from 'react'
import { ListOnScrollProps } from 'react-window'
import { HorizontalFilmListProps } from './horizontalFilmList'
import { FilmInfo } from 'types/dto/ssr'

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

const useHorizontalFilmList = ({
  filmList,
  isMobileSize = false,
  handleClickFilmCard,
  handleClickLoadMoreButton,
  index,
  isValidating,
}: HorizontalFilmListProps) => {
  const ref = useRef<HTMLDivElement>(null)

  //リストの初期スクロール位置をつけてあげる。
  // useEffect(() => {
  //   if (
  //     ref === null ||
  //     ref.current === null ||
  //     !index ||
  //     index % 2 === 0 ||
  //     index === 0
  //   )
  //     return
  //   ref.current.scrollLeft = 100
  // }, [filmList, index, ref])

  const onScroll = ({
    scrollDirection,
    scrollOffset,
    scrollUpdateWasRequested,
  }: ListOnScrollProps) => {
    console.log('aaa')

    if (!filmList) return

    const ListWidth = isMobileSize
      ? filmList.length * 200
      : filmList.length * 200

    const scrollRight = filmList.length * 200 - scrollOffset
    console.log(scrollRight)

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

  return {
    ref,
    onScroll,
  }
}

export default useHorizontalFilmList
