import { LockOutlined } from '@mui/icons-material'
import AdapterDayjs from '@mui/lab/AdapterDayjs'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
  Avatar,
  Button,
  Container,
  FormControl,
  MenuItem,
  TextField,
  Typography,
  FormHelperText,
  InputUnstyled,
  InputUnstyledProps,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { userColors } from 'common/userColor'
import { UserIcon } from 'components/model/user/userIcon'
import { useImageBase64s } from 'hooks/useImageBase64s'
import {
  emailValidationPattern,
  phoneNumberValidationPatten,
} from 'utils/validations'

const FileInputBody = styled(InputUnstyled)(({ theme }) => ({
  pointerEvents: 'none',
  'input[type="file"]': {
    width: '100%',
    '&::-webkit-file-upload-button': {
      visibility: 'hidden',
      marginRight: theme.spacing(1),
    },
  },
}))

type Props = {}

export type SignUpInput = {
  username: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  birthDay: string
  icon: FileList
  iconColor: string
}

const SignUpForm = ({}: Props) => {
  const {
    register,
    formState: { errors, isDirty, isValid },
    control,
    watch,
  } = useFormContext<SignUpInput>()

  const now = dayjs()
  const defaultBirthDay = now.subtract(20, 'year').toString()

  const { imageBase64s } = useImageBase64s(watch('icon'))
  const iconColor = watch('iconColor')

  return (
    <Container maxWidth='xs'>
      <form>
        <TextField
          label='ユーザーネーム'
          {...register('username', {
            required: '* ユーザーネームは必須入力です',
          })}
          helperText={errors.username?.message}
          fullWidth
          multiline
          rows={1}
          error={!!errors.username}
          sx={{ mb: 4 }}
        />
        <TextField
          label='電話番号'
          {...register('phoneNumber', {
            required: '* 電話番号は必須入力です',
            pattern: {
              value: phoneNumberValidationPatten,
              message: '無効な電話番号です',
            },
          })}
          helperText={errors.phoneNumber?.message || 'ハイフン無し'}
          fullWidth
          multiline
          rows={1}
          error={!!errors.phoneNumber}
          sx={{ mb: 4 }}
        />
        <TextField
          label='メールアドレス'
          {...register('email', {
            required: '* メールアドレスは必須入力です',
            pattern: {
              value: emailValidationPattern,
              message: '無効なメールアドレスです',
            },
          })}
          helperText={errors.email?.message}
          fullWidth
          multiline
          rows={1}
          error={!!errors.email}
          sx={{ mb: 4 }}
        />
        <Controller
          control={control}
          name='birthDay'
          rules={{ required: '* 生年月日は必須入力です' }}
          defaultValue={defaultBirthDay}
          render={({ field: { value, onChange } }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs} locale={ja}>
                <DatePicker
                  label='生年月日'
                  value={value}
                  onChange={onChange}
                  renderInput={(props) => (
                    <TextField {...props} sx={{ mb: 4, width: '100%' }} />
                  )}
                />
              </LocalizationProvider>
            )
          }}
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
        <TextField
          label='確認用パスワード'
          {...register('confirmPassword', {
            required: '* 確認用パスワードは必須入力です',
          })}
          helperText={errors.confirmPassword?.message}
          fullWidth
          multiline
          rows={1}
          error={!!errors.confirmPassword}
          sx={{ mb: 4 }}
        />

        <FormControl sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Button
              component='label'
              htmlFor='icon'
              variant='contained'
              color='primary'
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
              }}
            >
              画像を選択
            </Button>
            <FileInputBody
              error={!!errors.icon}
              {...register('icon', {
                validate: {
                  limit: (v) =>
                    !v.length || v.length === 1 || 'メイン画像は1枚までです',
                },
              })}
              sx={{ mb: 3 }}
              id='icon'
              type='file'
              componentsProps={
                {
                  input: { multiple: true },
                } as InputUnstyledProps['componentsProps']
              }
            />
          </Box>
          {errors.icon?.message && (
            <FormHelperText>{errors.icon?.message}</FormHelperText>
          )}
        </FormControl>
        <TextField
          fullWidth
          select
          label='アイコンカラー'
          {...register('iconColor', {
            required: '* アイコンカラーは必須入力です',
          })}
          sx={{ mb: 4 }}
        >
          {userColors.map((color) => (
            <MenuItem key={color.name} value={color.name}>
              {color.name}
            </MenuItem>
          ))}
        </TextField>
      </form>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h6' sx={{ textAlign: 'center', mb: 2 }}>
          アイコンプレビュー
        </Typography>
        {!!imageBase64s.length && !!iconColor && (
          <Box sx={{ margin: '0 auto', width: 100 }}>
            <UserIcon
              src={imageBase64s[0]}
              alt='プレビュー'
              width={100}
              color={iconColor}
            />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default SignUpForm
