import { useContext, useEffect, useMemo, useState } from 'react'
import { useStore } from 'zustand'

import FlatList from '../../../components/flat-list/flat-list'
import UserRowComponent from '../../../components/user-row/user-row'
import { GameContext } from '../store'

export type UserListComponentProps = {
  className?: string
}

const UserListComponent = ({ className }: UserListComponentProps) => {
  const store = useContext(GameContext)
  const userList = useStore(store!, (s) => s.userList)
  const config = useStore(store!, (s) => s.config)
  const session = useStore(store!, (s) => s.session)
  const readyMap = useStore(store!, (s) => s.userReadyMap)
  const [list, setList] = useState(userList)

  useEffect(() => {
    setList(
      userList.map((u) => {
        const ready = readyMap.get(u.id)
        console.log(ready)
        return {
          ...u,
          ready,
        }
      }),
    )
    return () => {}
  }, [userList, readyMap])
  // const isHost = useMemo(() => {}, [userList])
  const currentUserNumber = useMemo(() => userList.length, [userList])

  return (
    <>
      <div className={`${className ? className : ''}`}>
        <div className="flex flex-col justify-between w-2/3 h-full p-4 rounded-lg shadow-md">
          <div className="w-full p-2 text-center">
            <p className="font-bold">{`User List ${currentUserNumber} / ${config.maxPlayer}`}</p>
          </div>
          <div className="h-[95%] w-full">
            <FlatList
              data={list.map((u) => ({
                info: u,
                isMe: u.id === session.id,
              }))}
              renderItem={UserRowComponent}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserListComponent
