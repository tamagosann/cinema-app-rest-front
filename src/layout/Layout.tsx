import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import {
  AppBar,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Toolbar,
  Typography,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { createStyles, makeStyles } from '@mui/styles';
import { Box, Theme } from '@mui/system';
import { useRouter } from 'next/dist/client/router';
import { FC } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
// import UserContext from "../../store/userInfo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    drawerContainer: {
      width: 215,
    },
  }),
);

const Layout: FC = ({ children }) => {
  const { username, uid, isSignIn } = {
    username: 'むとう',
    uid: '0001',
    isSignIn: 'true',
  };
  const classes = useStyles();
  const isSm = useMediaQuery({ minWidth: 600 });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const link = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  const signOut = () => {
    //ログアウト処理
    link('/');
  };

  type DrawerListItem = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
    text: string;
    onClick: () => void;
    whenToShow: 'in' | 'out' | 'anytime';
  };

  const drawerList: DrawerListItem[] = [
    {
      Icon: MovieIcon,
      text: 'トップへ',
      onClick: () => link('/'),
      whenToShow: 'anytime',
    },
    {
      Icon: MeetingRoomIcon,
      text: 'サインイン',
      onClick: () => link('/auth/signin'),
      whenToShow: 'out',
    },
    {
      Icon: GroupAddIcon,
      text: 'サインアップ',
      onClick: () => link('/auth/signup'),
      whenToShow: 'out',
    },
    {
      Icon: ExitToAppIcon,
      text: 'サインアウト',
      onClick: () => {
        // ログアウト処理
        link('/');
      },
      whenToShow: 'in',
    },
    {
      Icon: AccountCircleIcon,
      text: 'マイページ',
      onClick: () => link('/user/userId'),
      whenToShow: 'in',
    },
  ];

  return (
    <>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <div style={{ verticalAlign: 'bottom' }} onClick={() => link('/')}>
              <img src={'/logo1.png'} width='130' />
            </div>
            <Box className={classes.title} />
            {isSm ? (
              <>
                <Box className={classes.title} />
                {isSignIn ? (
                  <>
                    <Typography>おかえり、{username}</Typography>
                    <Button color='inherit' onClick={() => signOut()}>
                      SIGN OUT
                    </Button>
                    <Button
                      color='inherit'
                      onClick={() => link(`/user/${uid}`)}
                    >
                      Mypage
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color='inherit'
                      onClick={() => link('/auth/signup')}
                    >
                      Sign Up
                    </Button>
                    <Button
                      color='inherit'
                      onClick={() => link('/auth/signin')}
                    >
                      Sign In
                    </Button>
                  </>
                )}
                <Button color='inherit' onClick={() => link('/')}>
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
      <Drawer
        anchor={'right'}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <div className={classes.drawerContainer}>
          <List>
            <Divider />
            {isSignIn
              ? drawerList
                  .filter((listItem) => {
                    return listItem.whenToShow !== 'out';
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
                    );
                  })
              : drawerList
                  .filter((listItem) => {
                    return listItem.whenToShow !== 'in';
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
                    );
                  })}
          </List>
        </div>
      </Drawer>
      <Container maxWidth='md'>{children}</Container>
    </>
  );
};

export default Layout;
