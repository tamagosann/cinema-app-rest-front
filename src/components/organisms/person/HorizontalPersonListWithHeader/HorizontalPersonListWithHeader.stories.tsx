import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import withMock from 'storybook-addon-mock'
import { stabFilmDataList } from 'common/test_mock/stabData'
import { HorizontalPersonListWithHeader } from 'components/organisms/person/HorizontalPersonListWithHeader'
import MuiThemeProvider from 'hooks/theme'
import { DISCOVER_FILM_URL, TMDB_HOST } from 'utils/filmRequests'

export default {
  title: 'Person/Holizontal Person list with Header',
  component: HorizontalPersonListWithHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof HorizontalPersonListWithHeader>

const Template: ComponentStory<typeof HorizontalPersonListWithHeader> = (
  args: any,
) => (
  <MuiThemeProvider>
    <HorizontalPersonListWithHeader {...args} />
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
