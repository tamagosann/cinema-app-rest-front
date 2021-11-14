import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import withMock from 'storybook-addon-mock'
import { stabFilmDataList } from 'common/test_mock/stabData'
import { HorizontalFilmListWithGenre } from 'components/organisms/film/HorizontalFilmListWithGenre'
import MuiThemeProvider from 'hooks/theme'
import { DISCOVER_FILM_URL, TMDB_HOST } from 'utils/filmRequests'

export default {
  title: 'Film/Holizontal film list with genre',
  component: HorizontalFilmListWithGenre,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof HorizontalFilmListWithGenre>

const Template: ComponentStory<typeof HorizontalFilmListWithGenre> = (
  args: any,
) => (
  <MuiThemeProvider>
    <HorizontalFilmListWithGenre {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = { genreId: 28, isMobileSize: true }
Mobile.parameters = {
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

export const PC = Template.bind({})
PC.args = { genreId: 28, isMobileSize: false }
PC.parameters = {
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
