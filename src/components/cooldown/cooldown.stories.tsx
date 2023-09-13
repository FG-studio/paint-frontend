import { Meta, StoryObj } from '@storybook/react'

import CoolDownComponent from './cooldown'

const meta: Meta<typeof CoolDownComponent> = {
  title: 'Component/CoolDown',
  component: CoolDownComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

type Story = StoryObj<typeof CoolDownComponent>
export default meta

export const FewSecCoolDown: Story = {
  args: {
    duractionSec: 10,
    onEnded: () => {
      console.log('on cooldown ended')
    },
  },
}
