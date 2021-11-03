import { ThemeProvider } from '@mui/material'
import { ThemeContext } from '@mui/styled-engine'
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

const Template: ComponentStory<typeof FilmCard> = (args) => (
  <MuiThemeProvider>
    <FilmCard {...args} />
  </MuiThemeProvider>
)

export const Loading = Template.bind({})
Loading.args = {}

export const Loaded = Template.bind({})
Loaded.args = { ...stabFilmData }
