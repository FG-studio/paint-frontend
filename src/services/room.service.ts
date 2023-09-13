import ky from 'ky'

import { GameConfig, GameState, GameUserInfo } from '../screen/game/types'

export type RoomResponse = {
  id: string
  state: GameState
  config: GameConfig
  users: GameUserInfo[]
  host_id: string
  show_order: string[]
}

export enum RoomState {
  PENDING = 0,
  QUESTION,
  DRAW,
  GUEST,
  SUMARY,
}

const roomEndpoint = `${window.API_ENDPOINT}/rooms`

export function createRoom(user: {
  user_id: string
  username: string
}): Promise<{ room: RoomResponse; channel: string }> {
  return ky
    .post(roomEndpoint, {
      json: user,
    })
    .json()
}

export function joinRoom(
  roomId: string,
  user: {
    user_id: string
    username: string
  },
): Promise<{ room: RoomResponse; channel: string }> {
  return ky
    .put(`${roomEndpoint}/${roomId}/join`, {
      json: user,
    })
    .json()
}

export function getRoom(roomId: string): Promise<RoomResponse> {
  return ky.get(`${roomEndpoint}/${roomId}`).json()
}

export function updateConfig(
  roomId: string,
  userId: string,
  config: GameConfig,
): Promise<GameConfig> {
  return ky
    .patch(`${roomEndpoint}/${roomId}/config`, {
      json: {
        user_id: userId,
        config,
      },
    })
    .json()
}

export function startRoom(
  roomId: string,
  userId: string,
): Promise<{ status: boolean }> {
  return ky
    .put(`${roomEndpoint}/${roomId}/start`, {
      json: {
        user_id: userId,
      },
    })
    .json()
}

export function submitRoundData(
  roomId: string,
  userId: string,
  payload: { type: 'text' | 'image'; data: string },
): Promise<{ status: boolean }> {
  console.trace('submit round data', payload)
  return ky
    .put(`${roomEndpoint}/${roomId}/submit`, {
      json: {
        user_id: userId,
        payload,
      },
    })
    .json()
}

export function getSumary(roomId: string): Promise<{
  data: Array<{
    group: string
    idx: number
    user_id: string
    data: { type: 'text' | 'image'; data: string } | undefined
  }>
}> {
  return ky.get(`${roomEndpoint}/${roomId}/sumary`).json()
}

export function unsubmit(
  roomId: string,
  userId: string,
): Promise<{ status: boolean }> {
  return ky.patch(`${roomEndpoint}/${roomId}/${userId}/unsubmit`).json()
}

export function leaveRoom(
  roomId: string,
  userId: string,
): Promise<{ status: boolean }> {
  return ky.patch(`${roomEndpoint}/${roomId}/${userId}/leave`).json()
}

export function nextResult(
  roomId: string,
  userId: string,
  groupIdx: number,
  round: number,
): Promise<{ groupIdx: number; round: number }> {
  return ky
    .get(
      `${roomEndpoint}/${roomId}/${userId}/request_result?groupIdx=${groupIdx}&round=${round}`,
    )
    .json()
}
