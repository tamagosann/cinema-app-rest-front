import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UserPageView } from '.'

import { stabFilmDataList } from 'common/test_mock/stabData'
import { PersonData, stabPersonDataList } from 'common/test_mock/stabPersonData'
import MuiThemeProvider from 'hooks/theme'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

export default {
  title: 'VIEWS/UserPageView',
  component: UserPageView,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UserPageView>

const Template: ComponentStory<typeof UserPageView> = (args: any) => (
  <MuiThemeProvider>
    <UserPageView {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = {
  userId: '0001',
  username: '武藤遊戯',
  icon: `${TMDB_IMAGE_URL}/4SYTH5FdB0dAORV98Nwg3llgVnY.jpg`,
  iconColor: 'blue',
  favoriteFilms: stabFilmDataList,
  favoritePeople: stabPersonDataList as PersonData[],
}
