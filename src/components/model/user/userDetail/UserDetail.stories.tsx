import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UserDetail } from '.'
import MuiThemeProvider from 'hooks/theme'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

export default {
  title: 'User/UserDetail',
  component: UserDetail,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UserDetail>

const Template: ComponentStory<typeof UserDetail> = (args: any) => (
  <MuiThemeProvider>
    <UserDetail {...args} />
  </MuiThemeProvider>
)

export const WithInfo = Template.bind({})
WithInfo.args = {
  icon: `${TMDB_IMAGE_URL}/4SYTH5FdB0dAORV98Nwg3llgVnY.jpg`,
  iconColor: 'blue',
  username: '武藤遊戯',
}
export const Skeleton = Template.bind({})
Skeleton.args = {}
