import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LoginForm } from '.'
import { withRHF } from 'common/testComponent/withRHF'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Auth/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withRHF(false)], // or true to show submit button on story
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args: any) => (
  <MuiThemeProvider>
    <LoginForm {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = { averageStar: 3.8, isMobileSize: true, filmId: 223388 }
