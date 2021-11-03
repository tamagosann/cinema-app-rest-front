import { ComponentMeta, ComponentStory } from '@storybook/react'
import { stabFilmData } from 'common/test_mock/stabData'
import { FilmCard } from 'components/model/film/filmCard/index'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Example/Button',
  component: FilmCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FilmCard>

const Template: ComponentStory<typeof FilmCard> = (args: any) => (
  <MuiThemeProvider>
    <FilmCard {...args} />
  </MuiThemeProvider>
)

export const LoadingMobile = Template.bind({})
LoadingMobile.args = { isMobileSize: true }

export const LoadedMobile = Template.bind({})
LoadedMobile.args = { ...stabFilmData, isMobileSize: true }

export const LoadingPC = Template.bind({})
LoadingPC.args = {}

export const LoadedPC = Template.bind({})
LoadedPC.args = { ...stabFilmData }
