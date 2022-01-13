import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LoginView } from '.'

import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'VIEWS/LoginView',
  component: LoginView,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoginView>

const Template: ComponentStory<typeof LoginView> = (args: any) => (
  <MuiThemeProvider>
    <LoginView {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = {}
