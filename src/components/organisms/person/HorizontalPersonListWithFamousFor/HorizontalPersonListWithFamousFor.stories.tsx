import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import withMock from 'storybook-addon-mock'
import { stabFilmDataList } from 'common/test_mock/stabData'
import { HorizontalPersonListWithFamousFor } from 'components/organisms/person/HorizontalPersonListWithFamousFor'
import MuiThemeProvider from 'hooks/theme'
import { DISCOVER_FILM_URL, TMDB_HOST } from 'utils/filmRequests'

export default {
  title: 'Person/Holizontal Person list with FamousFor',
  component: HorizontalPersonListWithFamousFor,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof HorizontalPersonListWithFamousFor>

const Template: ComponentStory<typeof HorizontalPersonListWithFamousFor> = (
  args: any,
) => (
  <MuiThemeProvider>
    <HorizontalPersonListWithFamousFor {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = { keyword: '' }
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
PC.args = { keyword: 'arnold' }
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
