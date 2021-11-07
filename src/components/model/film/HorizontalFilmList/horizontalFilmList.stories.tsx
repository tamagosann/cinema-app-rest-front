import { ComponentMeta, ComponentStory } from '@storybook/react'
import { stabFilmDataList } from 'common/test_mock/stabData'
import { HorizontalFilmList } from 'components/model/film/HorizontalFilmList'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Film/HolizontalFilmList',
  component: HorizontalFilmList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof HorizontalFilmList>

const Template: ComponentStory<typeof HorizontalFilmList> = (args: any) => (
  <MuiThemeProvider>
    <HorizontalFilmList {...args} />
  </MuiThemeProvider>
)

export const LoadingMobile = Template.bind({})
LoadingMobile.args = { isMobileSize: true }

export const LoadedMobile = Template.bind({})
LoadedMobile.args = { filmList: stabFilmDataList, isMobileSize: true }

export const LoadingPC = Template.bind({})
LoadingPC.args = {}

export const LoadedPC = Template.bind({})
LoadedPC.args = { filmList: stabFilmDataList }
