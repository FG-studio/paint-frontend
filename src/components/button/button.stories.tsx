import { Meta, StoryObj } from '@storybook/react'

import { delay } from '../../helpers/time'
import Button, { buttonVariants } from './button'

const meta: Meta<typeof Button> = {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const VariantsButtonStory = () => {
  return (
    <div>
      {buttonVariants.map((v) => {
        return (
          <Button className="my-2" variant={v as any}>
            Hello world
          </Button>
        )
      })}
    </div>
  )
}

VariantsButtonStory.story = {
  name: 'Button Variant',
}

export const ButtonTmp: Story = {
  args: {
    variant: 'success',
    children: 'Hello world',
  },
}

export const DisabledButton: Story = {
  args: {
    variant: 'light',
    children: 'Hello world',
    disabled: true,
  },
}

export const AsyncButton: Story = {
  args: {
    variant: 'success',
    children: 'Click me',
    onClick: () => {
      return delay(1000)
    },
  },
}
