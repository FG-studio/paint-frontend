import { Meta, StoryObj } from '@storybook/react'

import Button from '../button/button'
import NotificationComponent from './notification.component'
import { useNotificationContext } from './notification-context'
import NotificationProvider from './notification-provider'
import { NotificationType, notificationVariants } from './types'

let count = 0

const meta: Meta<typeof NotificationComponent> = {
  title: 'Component/Notification',
  component: NotificationComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NotificationComponent>

export const VariantNotificationStory = () => {
  return (
    <div>
      {notificationVariants.map((v) => {
        return (
          <div className="my-3">
            <NotificationComponent
              data={{
                title: 'This is a notification',
                content: 'Message description',
                type: v as NotificationType,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

VariantNotificationStory.story = {
  name: 'Notification Variant',
}

const DemoPushComponent = () => {
  const data = useNotificationContext()
  //   console.log(data)

  const pushNotificationClick = () => {
    data!.api.show({
      title: `This is a notification ${count}`,
      content: 'Message description',
      type: 'success',
    })
    count++
  }
  return (
    <Button variant="info" onClick={pushNotificationClick}>
      Push notification
    </Button>
  )
}

export const ContextStory = () => {
  return (
    <NotificationProvider>
      <DemoPushComponent />
    </NotificationProvider>
  )
}

ContextStory.story = {
  name: 'Notification Context',
}

export const NotificationTmp: Story = {
  args: {
    data: {
      title: 'This is a notification',
      content: 'Message description',
    },
  },
}
