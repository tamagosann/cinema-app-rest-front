import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FilmReviewList } from '.'
import {
  loadingReviewList,
  stabReviewList,
} from 'common/test_mock/stabReviewData'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Film/FilmReviewList',
  component: FilmReviewList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FilmReviewList>

const Template: ComponentStory<typeof FilmReviewList> = (args: any) => (
  <MuiThemeProvider>
    <FilmReviewList {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = {
  isMobileSize: true,
  reviewList: stabReviewList,
}

export const MobileLoading = Template.bind({})
MobileLoading.args = {
  isMobileSize: true,
  reviewList: loadingReviewList,
}

export const PC = Template.bind({})
PC.args = {
  isMobileSize: false,
  reviewList: stabReviewList,
}

export const PCLoading = Template.bind({})
PCLoading.args = {
  isMobileSize: false,
  reviewList: loadingReviewList,
}
