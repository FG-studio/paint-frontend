import { Meta, StoryObj } from '@storybook/react'

import ChatBubble from './chat-bubble'

const meta: Meta<typeof ChatBubble> = {
  title: 'Component/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

type Story = StoryObj<typeof ChatBubble>
export default meta

export const ChatBubbleStory: Story = {
  args: {
    children: <p>Hello world</p>,
    username: 'Shadow Walker',
  },
}
