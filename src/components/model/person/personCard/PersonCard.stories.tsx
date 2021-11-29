import { ComponentMeta, ComponentStory } from '@storybook/react'
import { PersonCard } from '.'
import { stabFilmData } from 'common/test_mock/stabData'
import { stabPersonData } from 'common/test_mock/stabPersonData'
import MuiThemeProvider from 'hooks/theme'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

export default {
  title: 'Person/PersonCard',
  component: PersonCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PersonCard>

const Template: ComponentStory<typeof PersonCard> = (args: any) => (
  <MuiThemeProvider>
    <PersonCard {...args} />
  </MuiThemeProvider>
)

export const Man = Template.bind({})
Man.args = {
  ...stabPersonData,
  gender: 1,
}

export const ManLoading = Template.bind({})
ManLoading.args = {}

export const Woman = Template.bind({})
Woman.args = { ...stabPersonData, gender: 2 }

export const WomanLoading = Template.bind({})
WomanLoading.args = {}
