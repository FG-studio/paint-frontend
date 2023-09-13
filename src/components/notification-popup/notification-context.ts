import { createContext, useContext } from 'react'

import { NotificationData } from './types'

type NotificationContextType = {
  api: {
    show: (data: NotificationData) => void
  }
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined)

export function useNotificationContext() {
  return useContext(NotificationContext)
}
