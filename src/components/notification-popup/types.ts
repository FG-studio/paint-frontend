import { ReactNode } from 'react'

export const notificationVariants = ['success', 'info', 'warning', 'error']

export type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const defaultDuration = 3000
export type NotificationData = {
  title: string
  type?: NotificationType
  content?: ReactNode
  duration?: number
  onClose?: () => void
}
