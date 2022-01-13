import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SignUpForm } from '.'
import { withRHF } from 'common/testComponent/withRHF'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Auth/SignUpForm',
  component: SignUpForm,
  argTypes: {
    onSubmit: { action: 'submit' },
    backgroundColor: { control: 'color' },
  },
  decorators: [withRHF(true)], // or true to show submit button on story
} as ComponentMeta<typeof SignUpForm>

const Template: ComponentStory<typeof SignUpForm> = (args: any) => (
  <MuiThemeProvider>
    <SignUpForm {...args} />
  </MuiThemeProvider>
)

export const Mobile = Template.bind({})
Mobile.args = { averageStar: 3.8, isMobileSize: true, filmId: 223388 }
