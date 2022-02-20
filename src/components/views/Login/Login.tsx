import { LockOutlined } from '@mui/icons-material'
import { Avatar, Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { createAxios } from '../../../../libs/axios'
import { LoginForm } from 'components/organisms/auth/LoginForm'
import { LoginInput } from 'components/organisms/auth/LoginForm/LoginForm'
import { useLoginUser } from 'hooks/useLoginUser'
import { useSnackBar } from 'hooks/useSnackBar'
import { LoginDto, LoginDtoClient } from 'types/dto/loginDto'

const { axios } = createAxios()

const LoginView: FC = () => {
  const router = useRouter()
  const formReturn = useForm<LoginInput>({ mode: 'onChange' })
  const {
    formState: { isDirty, isValid },
    handleSubmit,
  } = formReturn
  const { enquereSuccess, enquereError } = useSnackBar()
  const { data, mutate } = useLoginUser()

  const onSubmit = async (data: LoginInput) => {
    try {
      const { data: loginDtoClient } = await axios.post<LoginDtoClient>(
        '/api/auth/login',
        data,
      )
      if (loginDtoClient.isLoggedIn === true) {
        // ここで改めてユーザー情報を取ってくる
        enquereSuccess('ログインに成功しました')
        mutate()
      }
    } catch (err) {
      console.log(err)
      enquereError('ログインに失敗しました！')
    }
  }

  useEffect(() => {
    // ログインしていた場合はtopへリダイレクト
    if (data) router.replace('/top')
  }, [router, data])

  if (data) return <></>

  return (
    <Container maxWidth='xs' sx={{ position: 'relative', height: '100vh' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
        }}
      >
        <Avatar sx={{ mx: 'auto', mb: 1 }}>
          <LockOutlined />
        </Avatar>
        <Typography
          component='h1'
          variant='h5'
          sx={{ mb: 3, textAlign: 'center', width: '100%' }}
        >
          ログイン
        </Typography>
        <FormProvider {...formReturn}>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <LoginForm />
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Button
                sx={{ width: '100%' }}
                disabled={!isDirty || !isValid}
                type='submit'
              >
                ログイン
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Container>
  )
}

export default LoginView
