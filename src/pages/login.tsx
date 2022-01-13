import { GetServerSideProps } from 'next'
import React from 'react'
import { LoginView } from 'components/views/Login'

const LoginPage = () => {
  return <LoginView />
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO: ここでログイン済みの場合はトップページにリダイレクトさせる

  return {
    props: {
      ssr: true,
    },
  }
}
