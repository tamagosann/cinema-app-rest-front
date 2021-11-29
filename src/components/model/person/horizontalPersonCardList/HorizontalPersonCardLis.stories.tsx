import { ComponentMeta, ComponentStory } from '@storybook/react'
import { HorizontalPersonCardList } from '.'
import { stabPersonData } from 'common/test_mock/stabPersonData'
import MuiThemeProvider from 'hooks/theme'
import { TMDB_IMAGE_URL } from 'utils/filmRequests'

export default {
  title: 'Person/HorizontalPersonCardList',
  component: HorizontalPersonCardList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof HorizontalPersonCardList>

const Template: ComponentStory<typeof HorizontalPersonCardList> = (
  args: any,
) => (
  <MuiThemeProvider>
    <HorizontalPersonCardList {...args} />
  </MuiThemeProvider>
)

export const Load = Template.bind({})
Load.args = {
  personList: [
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
    { ...stabPersonData },
  ],
}

export const Loading = Template.bind({})
Loading.args = {}
