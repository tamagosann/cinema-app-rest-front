import { LockOutlined } from '@mui/icons-material'
import { Avatar, Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { SignUpForm } from 'components/organisms/auth/SignUpForm'
import { SignUpInput } from 'components/organisms/auth/SignUpForm/SignUpForm'

const SignUpView: FC = () => {
  const formReturn = useForm<SignUpInput>({ mode: 'onChange' })
  const {
    formState: { isDirty, isValid },
    handleSubmit,
  } = formReturn

  const onSubmit = (data: SignUpInput) => {
    console.log(data)
  }

  const click = async () => {
    const res = await fetch('api/top')
    console.log(res)
    const data = await res.json()
    console.log(data)
  }

  return (
    <Container maxWidth='xs'>
      <Button type='button' onClick={click}>
        フェッチ
      </Button>
      <Box sx={{ my: 4 }}>
        <Avatar sx={{ mx: 'auto', mb: 1 }}>
          <LockOutlined />
        </Avatar>
        <Typography
          component='h1'
          variant='h5'
          sx={{ mb: 3, textAlign: 'center', width: '100%' }}
        >
          サインアップ
        </Typography>
        <FormProvider {...formReturn}>
          <form
            onSubmit={handleSubmit(
              (data) => onSubmit(data),
              (err) => console.log(err),
            )}
          >
            <SignUpForm />
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Button
                sx={{ width: '100%' }}
                disabled={!isDirty || !isValid}
                type='submit'
              >
                サインアップ
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Container>
  )
}

export default SignUpView
