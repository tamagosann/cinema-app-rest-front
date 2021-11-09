import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ArrowButton } from '.'
import { stabFilmData } from 'common/test_mock/stabData'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'UIKit/ArrowButton',
  component: ArrowButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArrowButton>

const Template: ComponentStory<typeof ArrowButton> = (args: any) => (
  <MuiThemeProvider>
    <ArrowButton {...args} />
  </MuiThemeProvider>
)

export const Right = Template.bind({})
Right.args = { direction: 'right', handleClick: () => {} }

export const Left = Template.bind({})
Left.args = { direction: 'left', handleClick: () => {} }

export const Up = Template.bind({})
Up.args = { direction: 'up', handleClick: () => {} }

export const Down = Template.bind({})
Down.args = { direction: 'down', handleClick: () => {} }
