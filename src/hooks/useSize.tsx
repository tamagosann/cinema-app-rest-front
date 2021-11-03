import { Theme, useMediaQuery } from '@mui/material'
import React from 'react'

const useSize = () => {
  const isMobileSize = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs'),
  )
  return { isMobileSize }
}

export default useSize
