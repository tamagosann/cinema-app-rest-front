import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import React from 'react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

//material ui のテーマを認識させる

const withThemeProvider = (Story, context) => {
  return (
    <>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Story {...context} />
    </>
  )
}
export const decorators = [withThemeProvider]

const customViewports = {
  /** iPhone X */
  base: {
    name: 'base',
    styles: {
      width: '375px',
      height: '812px',
    },
    type: 'mobile',
  },
  /** iPad */
  md: {
    name: 'md',
    styles: {
      width: '768px',
      height: '1024px',
    },
    type: 'tablet',
  },
  /** MacBook Air */
  lg: {
    name: 'lg',
    styles: {
      width: '1280px',
      height: '800px',
    },
    type: 'desktop',
  },
}

export const parameters = {
  viewport: {
    viewports: customViewports,
    defaultViewport: 'base',
  },
}
