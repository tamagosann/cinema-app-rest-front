import { LockOutlined } from '@mui/icons-material'
import { Avatar, Button, Container, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {}

export type LoginInput = {
  email: string
  password: string
}

const LoginForm = ({}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginInput>()
  return (
    <Box>
      <TextField
        label='メールアドレスまたは電話番号'
        {...register('email', {
          required: '* メールアドレス又は電話番号は必須入力です',
        })}
        helperText={errors.email?.message}
        fullWidth
        multiline
        rows={1}
        error={!!errors.email}
        sx={{ mb: 4 }}
      />
      <TextField
        label='パスワード'
        {...register('password', {
          required: '* パスワードは必須入力です',
        })}
        helperText={errors.password?.message}
        fullWidth
        multiline
        rows={1}
        error={!!errors.password}
        sx={{ mb: 4 }}
      />
    </Box>
  )
}

export default LoginForm
