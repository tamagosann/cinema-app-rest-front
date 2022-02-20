import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import { FC } from 'react'
import logo from '../../../../../public/logo1.png'
import { UserDto } from 'types/dto/userDto'

type Props = {
  user: undefined | null | UserDto
  isSm: boolean
  link: (path: string) => void
  signOut: () => void
  setOpen: (bool: boolean) => void
}

const Header: FC<Props> = ({ user, isSm, link, signOut, setOpen }) => {
  return (
    <AppBar position='static'>
      <Container>
        <Toolbar>
          <Image
            src={logo}
            alt='logo'
            width={100}
            height={60}
            onClick={() => link('/top')}
          />
          <Box sx={{ flexGrow: 1 }} />
          {isSm ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              {user ? (
                <>
                  <Typography>おかえり、{user.username}</Typography>
                  <Button color='inherit' onClick={signOut}>
                    SIGN OUT
                  </Button>
                  <Button
                    color='inherit'
                    onClick={() => link(`/user/?userId=${user.userId}`)}
                  >
                    Mypage
                  </Button>
                </>
              ) : (
                <>
                  <Button color='inherit' onClick={() => link('/signup')}>
                    Sign Up
                  </Button>
                  <Button color='inherit' onClick={() => link('/login')}>
                    Log In
                  </Button>
                </>
              )}
              <Button color='inherit' onClick={() => link('/top')}>
                Find Film
              </Button>
            </>
          ) : (
            <>
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
