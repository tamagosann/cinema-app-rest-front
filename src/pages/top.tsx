import { GetServerSideProps } from 'next'
import React, { FC } from 'react'
import { TopView } from 'components/views/Top'
import useSize from 'hooks/useSize'

type Props = {
  genreIds: number[]
  isMobileSize: boolean
}

const TopPage: FC<Props> = () => {
  //ssr化も視野に入れ、genreIdなどはここから渡すことにする
  const { isMobileSize } = useSize()
  const stabProps = {
    genreIds: [28, 12, 14, 35, 878, 16],
  }
  const { genreIds } = stabProps
  return <TopView {...{ genreIds, isMobileSize }} />
}

export default TopPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      message: 'hello!',
    },
  }
}
