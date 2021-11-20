import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FilmReviewListWithTop } from '.'
import {
  loadingReviewList,
  stabReviewList,
} from 'common/test_mock/stabReviewData'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Film/FilmReviewListWithTop',
  component: FilmReviewListWithTop,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FilmReviewListWithTop>

const Template: ComponentStory<typeof FilmReviewListWithTop> = (args: any) => (
  <MuiThemeProvider>
    <FilmReviewListWithTop {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = {
  isMobileSize: true,
  averageStar: 3.5,
  // reviewList: stabReviewList,
}

export const MobileLoading = Template.bind({})
MobileLoading.args = {
  isMobileSize: true,
  averageStar: 3.5,
  // reviewList: loadingReviewList,
}

export const PC = Template.bind({})
PC.args = {
  isMobileSize: false,
  averageStar: 3.5,
  // reviewList: stabReviewList,
}

export const PCLoading = Template.bind({})
PCLoading.args = {
  isMobileSize: false,
  averageStar: 3.5,
  // reviewList: loadingReviewList,
}
