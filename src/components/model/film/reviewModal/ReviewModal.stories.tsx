import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ReviewModal } from 'components/model/film/reviewModal'
import MuiThemeProvider from 'hooks/theme'

export default {
  title: 'Film/ReviewModal',
  component: ReviewModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ReviewModal>

const Template: ComponentStory<typeof ReviewModal> = (args: any) => (
  <MuiThemeProvider>
    <ReviewModal {...args} />
  </MuiThemeProvider>
)

export const LoadingMobile = Template.bind({})
LoadingMobile.args = {}
