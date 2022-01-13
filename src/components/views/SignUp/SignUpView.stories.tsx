import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SignUpView } from '.'

import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'VIEWS/SignUpView',
  component: SignUpView,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SignUpView>

const Template: ComponentStory<typeof SignUpView> = (args: any) => (
  <MuiThemeProvider>
    <SignUpView {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = {}
