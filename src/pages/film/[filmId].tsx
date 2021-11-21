import { GetServerSideProps } from 'next'
import React, { FC } from 'react'
import { stabFilmData } from 'common/test_mock/stabData'
import { FilmId } from 'components/views/Film/FilmId'
import useSize from 'hooks/useSize'
import { FilmInfo } from 'types/dto/ssr'

type Props = FilmInfo

const FilmIdPage: FC<Props> = (props) => {
  console.log('props')
  console.log(props)
  const { isMobileSize } = useSize()
  return (
    <>
      <FilmId {...props} {...{ isMobileSize }} />
    </>
  )
}

export default FilmIdPage

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const filmId = context.params?.filmId as string | undefined
  console.log(filmId)

  // TODO: filmIdから、映画の基本情報を引っ張ってくるAPIをここで叩く
  // stabででーたを返す
  const stabResponse = { ...stabFilmData }
  return {
    props: {
      ...stabResponse,
    },
  }
}
