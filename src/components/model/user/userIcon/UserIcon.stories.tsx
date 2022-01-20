import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UserIcon } from '.'
import { stabFilmData } from 'common/test_mock/stabData'
import MuiThemeProvider from 'hooks/theme'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

export default {
  title: 'User/UserIcon',
  component: UserIcon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UserIcon>

const Template: ComponentStory<typeof UserIcon> = (args: any) => (
  <MuiThemeProvider>
    <UserIcon {...args} />
  </MuiThemeProvider>
)

export const Blue = Template.bind({})
Blue.args = {
  src: `${TMDB_IMAGE_URL}/4SYTH5FdB0dAORV98Nwg3llgVnY.jpg`,
  alt: stabFilmData.title,
  width: 100,
  color: 'blue',
}

export const Red = Template.bind({})
Red.args = {
  src: `${TMDB_IMAGE_URL}${stabFilmData.backdrop_path}`,
  alt: stabFilmData.title,
  width: 100,
  color: 'red',
}

export const Green = Template.bind({})
Green.args = {
  src: `${TMDB_IMAGE_URL}${stabFilmData.backdrop_path}`,
  alt: stabFilmData.title,
  width: 100,
  color: 'green',
}

export const Black = Template.bind({})
Black.args = {
  src: `${TMDB_IMAGE_URL}${stabFilmData.backdrop_path}`,
  alt: stabFilmData.title,
  width: 100,
  color: 'black',
}
