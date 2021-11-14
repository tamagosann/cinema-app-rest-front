import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import Image from 'next/image'
import React, { FC } from 'react'
import { getUserColor } from 'common/userColor'

type Props = {
  src: string
  alt: string
  width: number
  color: string
}

const useStyles = makeStyles({
  root: {
    borderRadius: '50%',
    overflow: 'hidden',
  },
})

const UserIcon: FC<Props> = ({ src, alt, width, color }) => {
  const { root } = useStyles()

  const userColor = getUserColor(color)

  const style = {
    border: `4px solid ${userColor}`,
    borderRadius: '50%',
  }

  return (
    <Box className={root} width={width} height={width} style={style}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={width}
        objectFit='cover'
        placeholder='blur'
        blurDataURL='/loading-image.jpg'
      />
    </Box>
  )
}

export default UserIcon
