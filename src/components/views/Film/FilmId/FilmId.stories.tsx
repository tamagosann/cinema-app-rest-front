import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { FilmId } from '.'
import { stabFilmData } from 'common/test_mock/stabData'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Views/FilmId Page',
  component: FilmId,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FilmId>

const Template: ComponentStory<typeof FilmId> = (args: any) => (
  <MuiThemeProvider>
    <FilmId {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = { ...{ ...stabFilmData }, isMobileSize: true, averageStar: 3.8 }

export const MobileLoading = Template.bind({})
MobileLoading.args = { isMobileSize: true }

export const PC = Template.bind({})
PC.args = { ...stabFilmData, isMobileSize: false, averageStar: 3.8 }

export const PCLoading = Template.bind({})
PCLoading.args = { ...stabFilmData, isMobileSize: false }
