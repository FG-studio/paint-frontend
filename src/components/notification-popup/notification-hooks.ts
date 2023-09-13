import { useEffect, useState } from 'react'

import { defaultDuration, NotificationData } from './types'

const notificationQueue: NotificationData[] = []
let timeout: any = undefined

export function useNotification() {
  const [notificationData, setNotificationData] = useState<
    NotificationData | undefined
  >(undefined)
  const [lastShowTs, setLastShowTs] = useState(Date.now())

  const pushNotification = (data: NotificationData) => {
    notificationQueue.push(data)
  }

  const close = () => {
    if (notificationData) {
      const onClose = notificationData.onClose
      setNotificationData(undefined)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (timeout) clearTimeout(timeout)
      setLastShowTs(Date.now())
      if (onClose) {
        onClose()
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (notificationData) return
      if (Date.now() - lastShowTs < 1000) return
      if (notificationQueue.length === 0) return
      const data = notificationQueue.shift()
      if (!data) return
      setNotificationData(data)
      timeout = setTimeout(close, data.duration || defaultDuration)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [lastShowTs, notificationData])

  return [notificationData, pushNotification, close]
}
