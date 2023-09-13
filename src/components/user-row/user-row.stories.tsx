import type { Meta, StoryObj } from '@storybook/react'

import UserRowComponent, { UserRowProps } from './user-row'

const hostUser: UserRowProps = {
  info: {
    name: 'Shadow Walker',
    avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    isHost: true,
  },
}

const nonAvatarUser: UserRowProps = {
  info: {
    name: 'Shadow Walker',
  },
}

const emptyUser: UserRowProps = {
  info: undefined,
}

const meta: Meta<typeof UserRowComponent> = {
  title: 'Component/UserRow',
  component: UserRowComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '328px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}

type Story = StoryObj<typeof UserRowComponent>

export default meta

export const UserRowFullInfo: Story = {
  args: hostUser,
}

export const NonAvatarUserRow: Story = {
  args: nonAvatarUser,
}

export const EmptyUserRow: Story = {
  args: emptyUser,
}

export const ReadyUserRow: Story = {
  args: {
    info: {
      ...hostUser.info!,
      ready: true,
    },
  },
}
