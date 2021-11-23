import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import withMock from 'storybook-addon-mock'
import { stabFilmDataList } from 'common/test_mock/stabData'
import { VerticalFilmListWithLabel } from 'components/organisms/film/VerticalFilmListWithLabel/index'
import MuiThemeProvider from 'hooks/theme'
import { DISCOVER_FILM_URL, TMDB_HOST } from 'utils/filmRequests'

export default {
  title: 'Film/Vertical film list with genre',
  component: VerticalFilmListWithLabel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof VerticalFilmListWithLabel>

const Template: ComponentStory<typeof VerticalFilmListWithLabel> = (
  args: any,
) => (
  <MuiThemeProvider>
    <VerticalFilmListWithLabel {...args} />
  </MuiThemeProvider>
)

export const SearchByGenre = Template.bind({})
SearchByGenre.args = { label: 'searchByGenre', genre: '28,12' }
SearchByGenre.parameters = {
  mockData: [
    {
      url: `${TMDB_HOST}${DISCOVER_FILM_URL}&with_genres=${28}`,
      method: 'GET',
      status: 200,
      response: {
        data: stabFilmDataList,
      },
      delay: 2000,
    },
  ],
}

export const SearchByKeyword = Template.bind({})
SearchByKeyword.args = { label: 'searchByKeyword', keyword: 'arnold' }
SearchByKeyword.parameters = {
  mockData: [
    {
      url: `${TMDB_HOST}${DISCOVER_FILM_URL}&with_genres=${28}`,
      method: 'GET',
      status: 200,
      response: {
        data: stabFilmDataList,
      },
      delay: 2000,
    },
  ],
}

export const NoSearch = Template.bind({})
NoSearch.args = { label: 'NoSearch' }
NoSearch.parameters = {
  mockData: [
    {
      url: `${TMDB_HOST}${DISCOVER_FILM_URL}&with_genres=${28}`,
      method: 'GET',
      status: 200,
      response: {
        data: stabFilmDataList,
      },
      delay: 2000,
    },
  ],
}
