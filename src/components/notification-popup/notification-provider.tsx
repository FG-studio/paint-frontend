import { ReactNode } from 'react'

import NotificationComponent from './notification.component'
import { NotificationContext } from './notification-context'
import { useNotification } from './notification-hooks'
import { NotificationData } from './types'

type NotificationProviderProps = {
  children: ReactNode
}

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notificationData, pushNotification, close] = useNotification()

  return (
    <>
      <NotificationContext.Provider
        value={{
          api: {
            show: pushNotification as (data: NotificationData) => void,
          },
        }}
      >
        {children}
        <div className="fixed top-4 right-4">
          <NotificationComponent
            data={notificationData as NotificationData | undefined}
            close={close as () => void}
          />
        </div>
      </NotificationContext.Provider>
    </>
  )
}

export default NotificationProvider
