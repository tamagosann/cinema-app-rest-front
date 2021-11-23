import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { SearchWithButton } from '.'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'UIKit/SearchWithButton',
  component: SearchWithButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SearchWithButton>

const Template: ComponentStory<typeof SearchWithButton> = (args: any) => {
  return (
    <MuiThemeProvider>
      <SearchWithButton {...args} />
    </MuiThemeProvider>
  )
}

export const Medium0 = () => {
  const [value, setValue] = React.useState<string>('')
  return (
    <Template
      keyword={value}
      handleChangeKeyword={(e) => setValue(e.target.value)}
      clearKeyword={() => setValue('')}
      handleClickSearchButton={() => console.log('searched', value)}
    />
  )
}
