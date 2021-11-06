import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { TopView } from '.'
import { stabFilmDataList } from 'common/test_mock/stabData'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Views/Top page',
  component: TopView,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TopView>

const Template: ComponentStory<typeof TopView> = (args: any) => (
  <MuiThemeProvider>
    <TopView {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = { genreIds: [28, 12, 14, 35, 878, 16], isMobileSize: true }

export const PC = Template.bind({})
PC.args = { genreIds: [28, 12, 14, 35, 878, 16], isMobileSize: false }
