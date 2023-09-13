import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from 'zustand'

import { useNotificationContext } from '../../components/notification-popup/notification-context'
import { DEBUG } from '../../config'
import { MsgBus, PersistanceStore } from '../../lib'
import { RoomEventMsgType, WebsocketAgent } from '../../modules/agent'
import * as RoomService from '../../services/room.service'
import { GameMock } from './game.mock'
import { createGameStore } from './store'
import { GameConfig, GameState, GameSumaryData, GameUserInfo } from './types'

const msgSubcribeChannelMap: Map<string, string> = new Map()

export function useGameHook() {
  const navigate = useNavigate()
  const notification = useNotificationContext()
  const eventTypeMap: Map<RoomEventMsgType, (data: any) => void> = new Map()
  const [agent, setAgent] = useState<WebsocketAgent | undefined>(undefined)
  const [searchParams] = useSearchParams()
  const gameStore = useRef(
    createGameStore(DEBUG ? GameMock : undefined),
  ).current
  // const userList = useStore(gameStore, (s) => s.userList)
  const setSession = useStore(gameStore, (s) => s.setSession)
  const setList = useStore(gameStore, (s) => s.setUserList)
  const setConfig = useStore(gameStore, (s) => s.setConfig)
  const setState = useStore(gameStore, (s) => s.setState)
  const setId = useStore(gameStore, (s) => s.setId)
  const addUser = useStore(gameStore, (s) => s.addUser)
  const removeUser = useStore(gameStore, (s) => s.removeUser)
  const setPrevData = useStore(gameStore, (s) => s.setPrevData)
  const setHostId = useStore(gameStore, (s) => s.setHostId)
  const setUserState = useStore(gameStore, (s) => s.setUserState)
  const addSumaryData = useStore(gameStore, (s) => s.addSumaryData)
  const roomConfig = useStore(gameStore, (s) => s.config)
  const setViewNext = useStore(gameStore, (s) => s.setViewNext)
  const setShowOrder = useStore(gameStore, (s) => s.setShowOrder)

  eventTypeMap.set('user_join', (user: GameUserInfo) => {
    addUser(user)
  })
  eventTypeMap.set('user_leave', (user: GameUserInfo) => {
    removeUser(user)
  })
  eventTypeMap.set('config_changed', (config: GameConfig) => {
    setConfig(config)
  })
  eventTypeMap.set(
    'state_changed',
    (data: {
      state: RoomService.RoomState
      round: number
      userData: { type: 'image' | 'text'; data: string }
    }) => {
      console.log('on state changed...', data)
      const { state, round, userData } = data
      switch (state) {
        case RoomService.RoomState.QUESTION: {
          console.log('changed to question state')
          setState(GameState.QUESTION, round)
          break
        }
        case RoomService.RoomState.DRAW: {
          console.log('update to draw state', userData)
          setPrevData(
            { type: userData.type, value: userData.data },
            GameState.PREDRAW,
            round,
            roomConfig.reviewDuration,
          )
          break
        }
        case RoomService.RoomState.GUEST: {
          console.log('update to guest state', userData)
          setPrevData(
            { type: userData.type, value: userData.data },
            GameState.GUEST,
            round,
            roomConfig.guestDuration,
          )
          break
        }
        case RoomService.RoomState.SUMARY: {
          console.log('update to sumaryx state')
          const roomId = searchParams.get('room')
          RoomService.getRoom(roomId!)
            .then((d) => {
              if (d.show_order.length < 0) {
                console.error('show order is empty', d)
                return
              }
              setShowOrder(d.show_order)
              setViewNext({ groupIdx: 0, round: 0 })
              setState(GameState.SUMARY)
            })
            .catch((e) => {
              console.error(e)
              notification!.api.show({
                type: 'error',
                title: 'API_CALL_ERROR',
              })
            })
          // @deprecated
          // const roomId = searchParams.get('room')
          // RoomService.getSumary(roomId!)
          //   .then((d) => {
          //     const dataMap: Map<string, ResultGameData[]> = new Map()
          //     for (const el of d.data.sort((a, b) => a.idx - b.idx)) {
          //       let group = dataMap.get(el.group)
          //       if (!group) {
          //         group = []
          //       }
          //       group.push({
          //         user_id: el.user_id,
          //         data: el.data
          //           ? { type: el.data.type, value: el.data.data }
          //           : {
          //               type:
          //                 el.idx === 0 || el.idx === userList.length - 1
          //                   ? 'text'
          //                   : 'image',
          //               value: '',
          //             },
          //       })
          //       dataMap.set(el.group, group)
          //     }
          //     console.log(`sumary data`, dataMap)
          //     setSumaryData([...dataMap.values()])
          //     setState(GameState.SUMARY)
          //   })
          //   .catch((e) => {
          //     console.error(e)
          //     notification!.api.show({
          //       type: 'error',
          //       title: 'API_CALL_ERROR',
          //     })
          //   })
          break
        }
        default:
          break
      }
    },
  )
  eventTypeMap.set(
    'user_state_changed',
    (data: { userId: string; ready: boolean }) => {
      setUserState(data)
    },
  )
  eventTypeMap.set(
    'next_sumary',
    (data: {
      result: GameSumaryData
      next: { groupIdx: number; round: number }
    }) => {
      const { result, next } = data
      addSumaryData(result)
      setViewNext(next)
    },
  )

  const onMessage = (msg: { type: RoomEventMsgType; data: any }) => {
    const { type, data } = msg
    const msgHandler = eventTypeMap.get(type)
    if (msgHandler) {
      msgHandler(data)
    }
  }

  const subcribeEventBus = (channel: string, cb: (data: any) => void) => {
    const listenerId = MsgBus.Instance.register(channel, cb)
    msgSubcribeChannelMap.set(channel, listenerId)
  }

  const initGameRoom = async (id: string) => {
    if (DEBUG) return
    const session = PersistanceStore.Instance.getObj<{
      id: string
      name: string
    }>('session')
    if (!session) {
      navigate('/')
      return
    }
    const channel = PersistanceStore.Instance.get('pubsub_channel')
    if (!channel) {
      navigate('/')
      return
    }
    try {
      const roomData = await RoomService.getRoom(id)
      setId(id)
      setSession({
        ...session,
        isHost: session.id === roomData.host_id,
      })
      setList(roomData.users)
      setConfig(roomData.config)
      setState(roomData.state)
      setHostId(roomData.host_id)

      setAgent(new WebsocketAgent(channel))
      subcribeEventBus(`room.${roomData.id}`, onMessage)
      subcribeEventBus(`room.${roomData.id}.*`, onMessage)
    } catch (e) {
      console.error(e)
      notification!.api.show({
        type: 'error',
        title: 'API_CALL_ERROR',
        onClose: () => {
          navigate('/')
        },
      })
    }
  }

  useEffect(() => {
    const room = searchParams.get('room')
    if (!room) {
      navigate('/')
      return () => {}
    } else {
      initGameRoom(room)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (agent) {
        // console.log('destroy agent...')
        agent.destroy()
      }
      // for (const [k, v] of msgSubcribeChannelMap.entries()) {
      //   MsgBus.Instance.unregister(k, v)
      // }
      // msgSubcribeChannelMap.clear()
    }
  }, [agent])

  return {
    gameStore,
  }
}
