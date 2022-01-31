import { ComponentMeta, ComponentStory } from '@storybook/react'
import withMock from 'storybook-addon-mock'
import { FilmReviewListWithTop } from '.'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Film/FilmReviewListWithTop',
  component: FilmReviewListWithTop,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof FilmReviewListWithTop>

const Template: ComponentStory<typeof FilmReviewListWithTop> = (args: any) => (
  <MuiThemeProvider>
    <FilmReviewListWithTop {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = { averageStar: 3.8, isMobileSize: true, filmId: 223388 }
// Mobile.parameters = {
//   mockData: [
//     {
//       url: `http://localhost:3030/film/review?filmId=${223388}&page=${1}`,
//       method: 'GET',
//       status: 200,
//       response: {
//         page: 1,
//         results: stabReviewList,
//         totalPages: 10,
//         totalResults: 1000,
//       } as FetchFilmReviewsByFilmIdDTO,
//       delay: 2000,
//     },
//   ],
// }

export const PC = Template.bind({})
PC.args = {
  isMobileSize: false,
  averageStar: 3.5,
  // reviewList: stabReviewList,
}
