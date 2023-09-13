import { MemetoStore } from '../../lib'
import { CanvasState } from '../../modules/paint/meta'

/* eslint-disable no-unused-vars */
export enum GameState {
  PENDING = 0,
  QUESTION,
  PREDRAW,
  DRAW,
  GUEST,
  SUMARY,
}

export type GameUserInfo = {
  id: string
  name: string
  avatar?: string
  isHost?: boolean
}

export type GameConfig = {
  maxPlayer: number
  reviewDuration: number
  drawDuration: number
  guestDuration: number
}

export type GamePlayerData = {
  type: 'text' | 'image'
  value: string
}

export type ResultGameData = {
  user_id: string
  data: GamePlayerData
}

export type GameSumaryData = {
  group: string
  idx: number
  user_id: string
  data: { type: 'text' | 'image'; data: string } | undefined
}

export type GameStoreState = {
  id: string
  state: GameState
  hostId: string
  userList: Array<GameUserInfo>
  config: GameConfig
  session: { name: string; isHost?: boolean; id: string }
  drawStore: MemetoStore<CanvasState>
  prevData?: GamePlayerData
  phaseTimeout?: number
  sumaryData?: Map<string, Array<ResultGameData>>
  round?: number
  userReadyMap: Map<string, boolean>
  showOrder?: string[]
  next?: { groupIdx: number; round: number }
  viewGroupIdx?: number
  viewRound?: number
}

export interface GameStoreAction {
  setId: (id: string) => void
  setHostId: (id: string) => void
  setState: (state: GameState, round?: number, timeout?: number) => void
  setUserList: (userList: Array<GameUserInfo>) => void
  setSession: (session: GameUserInfo) => void
  setPrevData: (
    data: GamePlayerData,
    nextState?: GameState,
    round?: number,
    timeout?: number,
  ) => void
  addUser: (user: GameUserInfo) => void
  removeUser: (user: GameUserInfo) => void
  setConfig: (config: GameConfig) => void
  setUserState: (data: { userId: string; ready: boolean }) => void
  setViewNext: (data: { groupIdx: number; round: number }) => void
  setViewData: (data: { groupIdx: number; round: number }) => void
  setShowOrder: (data: string[]) => void
  addSumaryData: (data: GameSumaryData) => void
}
