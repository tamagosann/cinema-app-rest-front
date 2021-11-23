import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { IndexView } from '.'
import { stabFilmDataList } from 'common/test_mock/stabData'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Views/Search page',
  component: IndexView,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof IndexView>

const Template: ComponentStory<typeof IndexView> = (args: any) => (
  <MuiThemeProvider>
    <IndexView {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = {}

export const PC = Template.bind({})
PC.args = { genreIds: [28, 12, 14, 35, 878, 16], isMobileSize: false }
