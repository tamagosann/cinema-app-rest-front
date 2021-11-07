import { ComponentMeta, ComponentStory } from '@storybook/react'
import { stabFilmData } from 'common/test_mock/stabData'
import { FilmModal } from 'components/model/film/filmModal/index'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Film/FilmModal',
  component: FilmModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FilmModal>

const Template: ComponentStory<typeof FilmModal> = (args: any) => (
  <MuiThemeProvider>
    <FilmModal {...args} />
  </MuiThemeProvider>
)

export const LoadingMobile = Template.bind({})
LoadingMobile.args = {
  open: true,
  toggleModal: (newOpen) => {},
  ...stabFilmData,
}

export const LoadedMobile = Template.bind({})
LoadedMobile.args = {}

export const LoadingPC = Template.bind({})
LoadingPC.args = {}

export const LoadedPC = Template.bind({})
LoadedPC.args = {}
