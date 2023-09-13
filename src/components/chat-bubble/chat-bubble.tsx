import { ReactNode } from 'react'

import DefaultAvatar from '../../assets/default-avatar.webp'

export type ChatBubbleProps = {
  children: ReactNode
  username: string
  avatar?: string
  bg?: string
  className?: string
  right?: boolean
}

const ChatBubble = ({
  children,
  username,
  avatar,
  className,
  right,
  bg,
}: ChatBubbleProps) => {
  return (
    <>
      <div
        className={`${className || ''} flex items-center ${
          right ? 'justify-end' : 'justify-start'
        } mb-4 `}
      >
        {!right ? (
          <div className="mx-2">
            <img
              className="w-11 h-11 mx-0 my-1 rounded-full"
              src={avatar ? avatar : DefaultAvatar}
              alt="avatar"
            />
          </div>
        ) : null}
        <div className={`flex flex-col ${right ? 'items-end' : 'items-start'}`}>
          <div>
            <p className="text-xs">{username}</p>
          </div>
          <div
            className={`flex-1 ${
              bg || 'bg-indigo-400'
            } text-white p-2 rounded-lg mb-2 relative`}
          >
            <div>{children}</div>

            <div
              className={`absolute ${
                right ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
              } top-[45%] transform rotate-45 w-2 h-2 ${bg || 'bg-indigo-400'}`}
            ></div>
          </div>
        </div>
        {right ? (
          <div className="mx-2">
            <img
              className="w-11 h-11 mx-0 my-1 rounded-full"
              src={avatar ? avatar : DefaultAvatar}
              alt="avatar"
            />
          </div>
        ) : null}
      </div>
    </>
  )
}

export default ChatBubble
