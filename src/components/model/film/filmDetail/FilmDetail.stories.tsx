import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { FilmDetail } from '.'
import { stabFilmData, stabFilmDataList } from 'common/test_mock/stabData'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Film/Film Detail',
  component: FilmDetail,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FilmDetail>

const Template: ComponentStory<typeof FilmDetail> = (args: any) => (
  <MuiThemeProvider>
    <FilmDetail {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = { ...stabFilmData, isMobileSize: true }

export const MobileLoading = Template.bind({})
MobileLoading.args = { isMobileSize: true }

export const PC = Template.bind({})
PC.args = { genreIds: [28, 12, 14, 35, 878, 16], isMobileSize: false }
