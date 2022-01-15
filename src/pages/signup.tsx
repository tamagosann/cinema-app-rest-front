import { GetServerSideProps } from 'next'
import React from 'react'
import { SignUpView } from 'components/views/SignUp'

const SignupPage = () => {
  return <SignUpView />
}

export default SignupPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO: ここでログイン済みの場合はトップページにリダイレクトさせる

  return {
    props: {
      ssr: true,
    },
  }
}
