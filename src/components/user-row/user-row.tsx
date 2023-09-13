import { useCallback } from 'react'
import { FaCrown, FaRegCheckCircle } from 'react-icons/fa'

import DefaultAvatar from '../../assets/default-avatar.webp'

export type UserRowProps = {
  info?: {
    name: string
    isHost?: boolean
    avatar?: string
    ready?: boolean
  }
  isMe?: boolean
}

const UserRowComponent = ({ info, isMe }: UserRowProps) => {
  // console.log(info)
  const userInfoRender = useCallback(() => {
    return info ? (
      <>
        <img
          className="w-11 h-11 mx-0 my-1 rounded-full"
          src={info.avatar ? info.avatar : DefaultAvatar}
          alt="avatar"
        />
        <div>
          <p className="text-xl font-bold">{info.name}</p>
        </div>
        <div>
          {info.ready ? (
            <FaRegCheckCircle size={25} className="fill-green-600" />
          ) : null}
        </div>
        <div>{info.isHost ? <FaCrown size={25} /> : null}</div>
      </>
    ) : (
      <>
        <img
          className="w-11 h-11 mx-0 my-1 rounded-full"
          src={DefaultAvatar}
          alt="default"
        />
        <div>
          <p className="text-xl font-bold">Empty</p>
        </div>
        <div></div>
        <div></div>
      </>
    )
  }, [info])
  return (
    <div
      className={`
      flex
      flex-row
      justify-between
      items-center
      py-4 
      px-2
      border
      ${isMe ? 'border-cyan-500' : 'border-gray-500'}
      rounded-tl-[100px]
      rounded-bl-[100px]
      rounded-tr-[25px]
      rounded-br-[25px]
      w-full
      h-16 
      min-h-[4rem]
      bg-gray-100
      hover:opacity-75
      `}
    >
      {userInfoRender()}
    </div>
  )
}

export default UserRowComponent
