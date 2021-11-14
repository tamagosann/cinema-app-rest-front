import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { FiveStars } from '.'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'UIKit/FiveStars',
  component: FiveStars,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FiveStars>

const Template: ComponentStory<typeof FiveStars> = (args: any) => {
  return (
    <MuiThemeProvider>
      <FiveStars {...args} />
    </MuiThemeProvider>
  )
}

export const Medium0 = () => {
  const [value, setValue] = React.useState<number | null>(0)
  return (
    <Template
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    />
  )
}
export const Small0 = () => {
  const [value, setValue] = React.useState<number | null>(0)
  return (
    <Template
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      size={'small'}
    />
  )
}
export const Large0 = () => {
  const [value, setValue] = React.useState<number | null>(0)
  return (
    <Template
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      size={'large'}
    />
  )
}
export const Medium05 = () => {
  const [value, setValue] = React.useState<number | null>(0.5)
  return (
    <Template
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    />
  )
}
export const Medium1 = () => {
  const [value, setValue] = React.useState<number | null>(1)
  return (
    <Template
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    />
  )
}
export const Medium15 = () => {
  const [value, setValue] = React.useState<number | null>(1.5)
  return (
    <Template
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    />
  )
}
export const Medium2 = () => {
  const [value, setValue] = React.useState<number | null>(2)
  return (
    <Template
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    />
  )
}
export const Medium25 = () => {
  const [value, setValue] = React.useState<number | null>(2.5)
  return (
    <Template
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    />
  )
}
export const Medium3 = () => {
  const [value, setValue] = React.useState<number | null>(3)
  return (
    <Template
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    />
  )
}
