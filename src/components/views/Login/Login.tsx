import { LockOutlined } from '@mui/icons-material'
import { Avatar, Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginForm } from 'components/organisms/auth/LoginForm'
import { LoginInput } from 'components/organisms/auth/LoginForm/LoginForm'

const LoginView: FC = () => {
  const formReturn = useForm<LoginInput>({ mode: 'onChange' })
  const {
    formState: { isDirty, isValid },
    handleSubmit,
  } = formReturn

  const onSubmit = (data: LoginInput) => {
    console.log(data)
  }

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
