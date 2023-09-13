import { IoMdCloseCircle } from 'react-icons/io'
import { MdCheckCircle, MdClose, MdInfo } from 'react-icons/md'

import { NotificationData, NotificationType } from './types'

type NotificationComponentProps = {
  data?: NotificationData
  close?: () => void
}

const NotificationComponent = ({ data, close }: NotificationComponentProps) => {
  const renderTypeIcon = (type?: NotificationType) => {
    if (!type) {
      return null
    }
    switch (type) {
      case 'success':
        return (
          <div>
            <MdCheckCircle size={25} className="fill-green-600" />
          </div>
        )
      case 'info':
        return (
          <div>
            <MdInfo size={25} className="fill-blue-600" />
          </div>
        )
      case 'warning':
        return (
          <div>
            <MdInfo size={25} className="fill-yellow-600" />
          </div>
        )
      case 'error':
        return (
          <div>
            <IoMdCloseCircle size={25} className="fill-red-600" />
          </div>
        )
      default:
        return null
    }
  }
  return data ? (
    <>
      <div className="bg-white p-4 min-w-[300px] min-h-[100px] rounded-lg shadow-md flex flex-row justify-between">
        <div className="mx-2 w-1/6 h-full">{renderTypeIcon(data.type)}</div>
        <div className="mx-2 w-2/3 h-full flex flex-col justify-center">
          <div className="w-full">
            <p>{data.title}</p>
          </div>
          {data.content ? <div className="w-full">{data.content}</div> : null}
        </div>
        <div className="mx-2 w-1/6 h-full">
          <div
            className="flex h-[25px] w-[25px] items-center justify-center cursor-pointer hover:bg-gray-400 hover:opacity-70"
            onClick={() => {
              if (close) close()
            }}
          >
            <MdClose size={25} />
          </div>
        </div>
      </div>
    </>
  ) : null
}

export default NotificationComponent
