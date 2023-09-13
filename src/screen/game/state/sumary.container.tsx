import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useStore } from 'zustand'

import Button from '../../../components/button/button'
import ChatBubble from '../../../components/chat-bubble/chat-bubble'
import { useNotificationContext } from '../../../components/notification-popup/notification-context'
import { listToMap } from '../../../helpers'
import * as RoomService from '../../../services/room.service'
import GameHeaderComponent from '../components/header.component'
import UserListComponent from '../components/user-list.component'
import { GameContext } from '../store'
import { ResultGameData } from '../types'

const GameSumaryState = () => {
  const store = useContext(GameContext)
  const notification = useNotificationContext()
  const userList = useStore(store!, (s) => s.userList)
  const viewGroupIdx = useStore(store!, (s) => s.viewGroupIdx)
  const viewRound = useStore(store!, (s) => s.viewRound)
  const showOrder = useStore(store!, (s) => s.showOrder)
  const session = useStore(store!, (s) => s.session)
  const roomId = useStore(store!, (s) => s.id)
  const sumaryData = useStore(store!, (s) => s.sumaryData)
  const next = useStore(store!, (s) => s.next)
  const userMap = listToMap(userList, (d) => d.id)
  const [data, setData] = useState<ResultGameData[]>([])
  const endViewRef = useRef<HTMLDivElement>(null)
  const nextResult = useCallback(async () => {
    if (!next) return
    if (next.groupIdx === -1 && next.round === -1) return
    try {
      await RoomService.nextResult(
        roomId,
        session.id,
        next.groupIdx,
        next.round,
      )
    } catch (e) {
      console.error(e)
      notification!.api.show({
        title: 'API_CALL_ERROR',
      })
    }
  }, [notification, roomId, session.id, next])
  useEffect(() => {
    if (!sumaryData) return
    if (viewGroupIdx === undefined || viewRound === undefined) return
    if (viewGroupIdx === -1 && viewRound === -1) {
      return
    }
    const group = showOrder![viewGroupIdx]
    if (!group) {
      console.error(`group ${viewGroupIdx} not found`, showOrder)
      return
    }
    const list = sumaryData.get(group)
    if (!list) {
      console.error(`list data of group ${group} not found`)
      return
    }
    setData([...list])
  }, [showOrder, viewGroupIdx, viewRound, sumaryData])
  useEffect(() => {
    endViewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [data])
  const isHost = useMemo(() => {
    const user = userList.find((u) => u.id === session.id)
    return user && user.isHost
  }, [userList, session])
  return (
    <div className="h-full w-full px-10 py-10 flex flex-row justify-between items-start">
      <UserListComponent className="w-1/3 h-full" />
      <div className="w-2/3 h-full flex flex-col justify-center items-center">
        <GameHeaderComponent
          className="w-full h-20 mb-3"
          title="Sumary Result"
        />
        <div className="w-full rounded-lg shadow-md h-[80%]">
          <div className="w-full h-[80%]">
            <div className="rounded-lg border border-gray-500 w-full h-full">
              <div className="p-5 overflow-y-auto max-h-full">
                {data.map((d, i) => {
                  const userInfo = userMap.get(d.user_id)
                  if (!userInfo) return null
                  return (
                    <ChatBubble
                      key={d.user_id}
                      username={userInfo.name}
                      right={i % 2 !== 0}
                    >
                      <div>
                        {d.data.type === 'image' ? (
                          <img
                            className=" h-[240px] w-[360px]"
                            src={d.data.value}
                            alt="data-for-draw"
                          />
                        ) : (
                          <p>{d.data.value}</p>
                        )}
                      </div>
                    </ChatBubble>
                  )
                })}
                <div ref={endViewRef} />
              </div>
            </div>
          </div>
          {isHost ? (
            <div className="w-full h-[20%] flex flex-row justify-center items-center">
              <Button
                className="w-20 m-4"
                variant="primary"
                onClick={nextResult}
              >
                Next
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default GameSumaryState
