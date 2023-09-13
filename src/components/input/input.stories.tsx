import { Meta, StoryObj } from '@storybook/react'

import TextInput from './text-input'

const meta: Meta<typeof TextInput> = {
  title: 'Component/Input',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof TextInput>

export const TextInputStory: Story = {
  args: {
    placeholder: 'username',
  },
}
