import { Meta, StoryObj } from '@storybook/react'

import ConfigFormComponent from './config-form.component'

const meta: Meta<typeof ConfigFormComponent> = {
  title: 'Game/Component/ConfigFormComponent',
  component: ConfigFormComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

type Story = StoryObj<typeof ConfigFormComponent>
export default meta

export const ConfigForm: Story = {
  args: {},
}
