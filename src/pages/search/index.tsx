import { GetServerSideProps } from 'next'
import React, { FC } from 'react'
import { IndexView } from 'components/views/search/Index/index'

type Props = {}

const IndexPage: FC<Props> = () => {
  return (
    <>
      <IndexView />
    </>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      message: 'hello!',
    },
  }
}
