import { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'zustand'

import Button from '../../../components/button/button'
import { useNotificationContext } from '../../../components/notification-popup/notification-context'
import * as RoomService from '../../../services/room.service'
import ConfigFormComponent from '../components/config/config-form.component'
import ConfigViewComponent from '../components/config/config-view.component'
import GameHeaderComponent from '../components/header.component'
import UserListComponent from '../components/user-list.component'
import { GameContext } from '../store'
import { GameConfig } from '../types'

const GamePendingState = () => {
  const store = useContext(GameContext)
  const navigate = useNavigate()
  const notification = useNotificationContext()
  const roomId = useStore(store!, (s) => s.id)
  const userList = useStore(store!, (s) => s.userList)
  const session = useStore(store!, (s) => s.session)
  const config = useStore(store!, (s) => s.config)
  const isHost = useMemo(() => {
    const user = userList.find((u) => u.id === session.id)
    return user && user.isHost
  }, [userList, session])
  const onBack = async () => {
    try {
      await RoomService.leaveRoom(roomId, session.id)
    } catch (e) {
      console.error(e)
      notification!.api.show({
        title: 'API_CALL_ERROR',
      })
    } finally {
      navigate('/')
    }
    //
  }
  const startGame = async () => {
    if (!isHost) {
      notification!.api.show({
        title: 'YOU_IS_NOT_THE_HOST',
      })
      return
    }
    try {
      await RoomService.startRoom(roomId, session.id)
    } catch (e) {
      console.error(e)
      notification!.api.show({
        title: 'API_CALL_ERROR',
      })
    }
  }

  const updateConfig = async (config: GameConfig) => {
    try {
      await RoomService.updateConfig(roomId, session.id, config)
    } catch (e) {
      console.error(e)
      notification!.api.show({
        title: 'API_CALL_ERROR',
      })
    }
  }

  return (
    <div className="h-full w-full px-10 py-10 flex flex-row justify-between items-start">
      <UserListComponent className="w-1/3 h-full" />
      <div className="w-2/3">
        <GameHeaderComponent
          className="w-full h-20 mb-3"
          title={`Room Id: ${roomId}`}
          onBack={onBack}
        />
        <div className="w-full p-4 rounded-lg shadow-md h-[80%]">
          <div className="w-full h-[80%]">
            {isHost ? (
              <ConfigFormComponent
                defaultValue={config}
                onSubmitCb={updateConfig}
              />
            ) : (
              <ConfigViewComponent config={config} />
            )}
          </div>
          <div className="flex flex-row justify-end items-center">
            {isHost ? (
              <>
                <Button
                  className="w-20 mx-3"
                  variant="primary"
                  onClick={startGame}
                >
                  Start
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePendingState
