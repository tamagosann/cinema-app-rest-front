import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FilmReviewList } from '.'
import { stabFilmData } from 'common/test_mock/stabData'
import { stabReviewList } from 'common/test_mock/stabReviewData'
import MuiThemeProvider from 'hooks/theme'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

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

export const PC = Template.bind({})
PC.args = {
  isMobileSize: false,
  reviewList: stabReviewList,
}
