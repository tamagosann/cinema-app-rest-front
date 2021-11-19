import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FilmReview } from '.'
import { stabFilmData } from 'common/test_mock/stabData'
import MuiThemeProvider from 'hooks/theme'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

export default {
  title: 'Film/FilmReview',
  component: FilmReview,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FilmReview>

const Template: ComponentStory<typeof FilmReview> = (args: any) => (
  <MuiThemeProvider>
    <FilmReview {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = {
  isMobileSize: true,
  userIconUrl: `${TMDB_IMAGE_URL}${stabFilmData.backdrop_path}`,
  username: '木村拓哉',
  userIconColor: 'red',
  star: 2,
  reviewDate: Date.now(),
  reviewTitle:
    'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
  overview:
    'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
}
export const MobileLoading = Template.bind({})
MobileLoading.args = {
  isMobileSize: true,
  userIconUrl: undefined,
  username: undefined,
  userIconColor: undefined,
  star: undefined,
  reviewDate: undefined,
  reviewTitle: undefined,
  overview: undefined,
}

export const PC = Template.bind({})
PC.args = {
  isMobileSize: false,
  userIconUrl: `${TMDB_IMAGE_URL}${stabFilmData.backdrop_path}`,
  username: '木村拓哉',
  userIconColor: 'red',
  star: 2,
  reviewDate: Date.now(),
  reviewTitle:
    'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
  overview:
    'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
}

export const PCLoading = Template.bind({})
PCLoading.args = {
  isMobileSize: false,
  userIconUrl: undefined,
  username: undefined,
  userIconColor: undefined,
  star: undefined,
  reviewDate: undefined,
  reviewTitle: undefined,
  overview: undefined,
}
