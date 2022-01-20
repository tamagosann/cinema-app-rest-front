import { Paper, Skeleton, Typography, Stack, Divider } from '@mui/material'
import { Box, styled } from '@mui/system'
import React, { FC } from 'react'
import { UserIcon } from '../userIcon'

type Props = Partial<{
  icon: string
  iconColor: string
  username: string
}>
const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
}))

const UserDerail: FC<Props> = ({ icon, iconColor, username }) => {
  return (
    <Paper sx={{ maxWidth: 300, padding: 2, margin: '0 auto' }}>
      <UserIcon
        {...{
          src: icon ?? '/icon.png',
          alt: 'ユーザーアイコン',
          width: 100,
          color: iconColor ?? 'black',
          sx: { margin: '0 auto', mb: 2 },
        }}
      />
      <Typography component='h3' variant='h6' textAlign='center' sx={{ mb: 2 }}>
        {username ?? <Skeleton width='50%' sx={{ margin: '0 auto' }} />}
      </Typography>
      <Box>
        <Stack
          direction='row'
          justifyContent='space-between'
          divider={<Divider orientation='vertical' flexItem />}
          spacing={2}
        >
          <Item>
            <Typography sx={{ fontSize: '0.5rem', mb: 0.5 }}>映画</Typography>
            <Box>68 FAV!</Box>
          </Item>
          <Item>
            <Typography sx={{ fontSize: '0.5rem', mb: 0.5 }}>俳優</Typography>
            <Box>68 FAV!</Box>
          </Item>
          <Item>
            <Typography sx={{ fontSize: '0.5rem', mb: 0.5 }}>
              レビュー
            </Typography>
            <Box>68 件</Box>
          </Item>
        </Stack>
      </Box>
    </Paper>
  )
}

export default UserDerail
