import { createContext } from 'react'
import { createStore } from 'zustand'

import {
  makeRandomString,
  makeUniqueId,
  removeDuplicateObjectArr,
} from '../../helpers'
import { MemetoStore } from '../../lib'
import {
  GameConfig,
  GameState,
  GameStoreAction,
  GameStoreState,
  GameSumaryData,
  ResultGameData,
} from './types'

function resetMapToFalse(userMap: Map<string, boolean>): Map<string, boolean> {
  for (const k of userMap.keys()) {
    userMap.set(k, false)
  }
  return userMap
}

export const createGameStore = (initState?: Partial<GameStoreState>) => {
  const defaultState: GameStoreState = {
    id: makeUniqueId(),
    state: GameState.PENDING,
    userList: [],
    config: {
      drawDuration: 60,
      reviewDuration: 10,
      guestDuration: 30,
      maxPlayer: 3,
    },
    userReadyMap: new Map<string, boolean>(),
    drawStore: new MemetoStore(),
    hostId: '',
    session: {
      name: makeRandomString(3),
      isHost: false,
      id: makeRandomString(2),
    },
  }
  return createStore<GameStoreState & GameStoreAction>()((set) => ({
    ...defaultState,
    ...initState,
    setId: (id) => set({ id }),
    setSession: (session) => set({ session }),
    setState: (state, round?: number, timeout?: number) =>
      set((props) => {
        const map = resetMapToFalse(props.userReadyMap)
        return {
          ...props,
          state,
          round: round === -1 ? props.round : round,
          phaseTimeout: timeout,
          userReadyMap: map,
        }
      }),
    setUserList: (userList) => set({ userList }),
    addUser: (user) =>
      set((state) => {
        const currentList = state.userList
        currentList.push(user)
        return {
          ...state,
          userList: removeDuplicateObjectArr(currentList),
        }
      }),
    removeUser: (user) =>
      set((state) => {
        const currentList = state.userList
        return {
          ...state,
          userList: currentList.filter((u) => u.id !== user.id),
        }
      }),
    setPrevData: (
      data,
      nextState?: GameState,
      round?: number,
      timeout?: number,
    ) => {
      return set((state) => {
        const map = resetMapToFalse(state.userReadyMap)
        return {
          ...state,
          prevData: data,
          round: round === -1 ? state.round : round,
          state: nextState !== undefined ? nextState : GameState.PREDRAW,
          phaseTimeout: timeout,
          userReadyMap: new Map(map),
        }
      })
    },
    setConfig: (config: GameConfig) => {
      return set((state) => ({
        ...state,
        config,
      }))
    },
    setHostId: (id) => set({ hostId: id }),
    setUserState: (data) => {
      return set((state) => ({
        userReadyMap: new Map(state.userReadyMap).set(data.userId, data.ready),
      }))
    },
    setViewData: (data: { groupIdx: number; round: number }) =>
      set({ viewGroupIdx: data.groupIdx, viewRound: data.round }),
    setShowOrder: (data: string[]) => set({ showOrder: data }),
    setViewNext: (data) =>
      set((state) => {
        const curNext = state.next
        if (!curNext) {
          return {
            ...state,
            next: data,
          }
        }

        return {
          ...state,
          viewGroupIdx: curNext.groupIdx,
          viewRound: curNext.round,
          next: data,
        }
      }),
    addSumaryData: (data: GameSumaryData) => {
      return set((state) => {
        const sumary = state.sumaryData || new Map<string, ResultGameData[]>()
        const group = sumary.get(data.group) || []
        group.push({
          user_id: data.user_id,
          data: data.data
            ? { type: data.data.type, value: data.data.data }
            : {
                type:
                  data.idx === 0 || data.idx === state.userList.length - 1
                    ? 'text'
                    : 'image',
                value: '',
              },
        })

        return {
          sumaryData: new Map(sumary).set(data.group, group),
        }
      })
    },
  }))
}

export type GameStore = ReturnType<typeof createGameStore>
export const GameContext = createContext<GameStore | null>(null)
