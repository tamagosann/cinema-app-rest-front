import { ComponentMeta, ComponentStory } from '@storybook/react'
import { stabFilmDataList } from 'common/test_mock/stabData'
import { VerticalFilmList } from 'components/model/film/VerticalFilmList'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Film/VerticalFilmList',
  component: VerticalFilmList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof VerticalFilmList>

const Template: ComponentStory<typeof VerticalFilmList> = (args: any) => (
  <MuiThemeProvider>
    <VerticalFilmList {...args} />
  </MuiThemeProvider>
)

export const LoadingMobile = Template.bind({})
LoadingMobile.args = {}

export const LoadedMobile = Template.bind({})
LoadedMobile.args = { filmList: stabFilmDataList }

export const LoadingNext = Template.bind({})
LoadingNext.args = { filmList: stabFilmDataList, isValidating: true }
