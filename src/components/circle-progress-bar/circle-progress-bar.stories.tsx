import { Meta, StoryObj } from '@storybook/react'

import CircleProgressBar from './circle-progress-bar'

const meta: Meta<typeof CircleProgressBar> = {
  title: 'Component/CircleProgressBar',
  component: CircleProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}
type Story = StoryObj<typeof CircleProgressBar>
export default meta

export const ProgressBar: Story = {
  args: {
    percent: 50,
  },
}
