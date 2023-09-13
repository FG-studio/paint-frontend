import { Meta, StoryObj } from '@storybook/react'

import { MemetoStore } from '../../lib'
import { CanvasState } from './meta'
import PaintApp from './paint'

const meta: Meta<typeof PaintApp> = {
  title: 'Module/Paint/App',
  component: PaintApp,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '960px', height: '480px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}
type Story = StoryObj<typeof PaintApp>
export default meta
export const PaintAppExample: Story = {
  args: {
    store: new MemetoStore<CanvasState>(),
  },
}
