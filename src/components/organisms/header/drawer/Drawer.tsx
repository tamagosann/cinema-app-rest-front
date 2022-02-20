import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import MovieIcon from '@mui/icons-material/Movie'
import {
  Divider,
  Drawer as DrawerComponent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Box } from '@mui/system'
import { FC } from 'react'
import { UserDto } from 'types/dto/userDto'

type DrawerListItem = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  text: string
  onClick: () => void
  whenToShow: 'in' | 'out' | 'anytime'
}

type DrawerList = (
  link: (path: string) => void,
  userId: number | undefined,
  signOut: () => Promise<void>,
) => DrawerListItem[]

const drawerListFn: DrawerList = (link, userId, signOut) => [
  {
    Icon: MovieIcon,
    text: 'トップへ',
    onClick: () => link('/top'),
    whenToShow: 'anytime',
  },
  {
    Icon: MeetingRoomIcon,
    text: 'サインイン',
    onClick: () => link('/login'),
    whenToShow: 'out',
  },
  {
    Icon: GroupAddIcon,
    text: 'サインアップ',
    onClick: () => link('/signup'),
    whenToShow: 'out',
  },
  {
    Icon: ExitToAppIcon,
    text: 'サインアウト',
    onClick: () => {
      signOut()
    },
    whenToShow: 'in',
  },
  {
    Icon: AccountCircleIcon,
    text: 'マイページ',
    onClick: () => link(`/user?userId=${userId}`),
    whenToShow: 'in',
  },
]

type Props = {
  user: UserDto | undefined | null
  open: boolean
  setOpen: (bool: boolean) => void
  link: (path: string) => void
  signOut: () => Promise<void>
}

const Drawer: FC<Props> = ({ open, setOpen, link, user, signOut }) => {
  const userId = user?.userId
  const drawerList = drawerListFn(link, userId, signOut)
  return (
    <DrawerComponent
      anchor={'right'}
      open={open}
      onClose={() => setOpen(false)}
      ModalProps={{ keepMounted: true }}
    >
      <Box sx={{ width: 215 }}>
        <List>
          <Divider />
          {user
            ? drawerList
                .filter((listItem) => {
                  return listItem.whenToShow !== 'out'
                })
                .map((drawerListItem) => {
                  return (
                    <>
                      <ListItem button onClick={drawerListItem.onClick}>
                        <ListItemIcon>{<drawerListItem.Icon />}</ListItemIcon>
                        <ListItemText primary={drawerListItem.text} />
                      </ListItem>
                      <Divider />
                    </>
                  )
                })
            : drawerList
                .filter((listItem) => {
                  return listItem.whenToShow !== 'in'
                })
                .map((drawerListItem) => {
                  return (
                    <>
                      <ListItem button onClick={drawerListItem.onClick}>
                        <ListItemIcon>{<drawerListItem.Icon />}</ListItemIcon>
                        <ListItemText primary={drawerListItem.text} />
                      </ListItem>
                      <Divider />
                    </>
                  )
                })}
        </List>
      </Box>
    </DrawerComponent>
  )
}

export default Drawer
