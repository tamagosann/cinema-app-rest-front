import { Container } from '@mui/material'
import { useRouter } from 'next/dist/client/router'
import { FC } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useMediaQuery } from 'react-responsive'
import { createAxios } from '../../libs/axios'
import { Drawer } from 'components/organisms/header/drawer'
import { Header } from 'components/organisms/header/header'
import { useLoginUser } from 'hooks/useLoginUser'
import { useSnackBar } from 'hooks/useSnackBar'
import { LogoutDto } from 'types/dto/loginDto'

const { axios } = createAxios()

const Layout: FC = ({ children }) => {
  const { data: user } = useLoginUser()
  const isSm = useMediaQuery({ minWidth: 600 })
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { enquereSuccess, enquereError } = useSnackBar()
  const { mutate } = useLoginUser()

  const link = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router],
  )

  const signOut = async () => {
    try {
      const { data: logoutDto } = await axios.post<LogoutDto>(
        '/api/auth/logout',
      )
      if (logoutDto.success === true) {
        mutate({ user: null }, false)
        enquereSuccess('ログアウトしました。')
      }
    } catch (err) {
      console.log(err)
      enquereError('ログアウトに失敗しました！')
    }
  }

  return (
    <>
      <Header
        {...{
          user,
          isSm,
          link,
          signOut,
          setOpen,
        }}
      />
      <Drawer
        {...{
          user,
          open,
          setOpen,
          link,
          signOut,
        }}
      />
      <Container maxWidth='md'>{children}</Container>
    </>
  )
}

export default Layout
