import { Meta, StoryObj } from '@storybook/react'

import UserRowComponent from '../user-row/user-row'
import FlatList from './flat-list'

const listUser = new Array(20)
  .fill(0)
  .map((_, i) => ({ name: `user ${i + 1}` }))

const meta: Meta<typeof FlatList> = {
  title: 'Component/FlatList',
  component: FlatList,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '328px', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FlatList>

export const UserFlatList: Story = {
  args: {
    renderItem: UserRowComponent,
    data: listUser.map((u, i) => ({ info: { ...u }, isMe: i === 0 })),
  },
}
