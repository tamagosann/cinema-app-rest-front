import { ComponentMeta, ComponentStory } from '@storybook/react'
import FilmCard from './FilmCard'

export default {
  title: 'Example/Button',
  component: FilmCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FilmCard>

const Template: ComponentStory<typeof FilmCard> = (args) => (
  <FilmCard {...args} />
)
