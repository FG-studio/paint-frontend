import { useContext, useState } from 'react'
import { useStore } from 'zustand'

import { useNotificationContext } from '../../../components/notification-popup/notification-context'
import PaintApp from '../../../modules/paint/paint'
import * as RoomService from '../../../services/room.service'
import GameHeaderComponent from '../components/header.component'
import UserListComponent from '../components/user-list.component'
import { GameContext } from '../store'

const GameDrawState = () => {
  const store = useContext(GameContext)
  const session = useStore(store!, (s) => s.session)
  const drawStore = useStore(store!, (s) => s.drawStore)
  const roomId = useStore(store!, (s) => s.id)
  const notification = useNotificationContext()
  const [isReady, setReady] = useState(false)
  const onTimeout = async () => {
    await submit()
    drawStore.clear()
  }

  const onSubmitEvent = () => {
    if (isReady) return unSubmit()
    else {
      return submit()
    }
  }

  const unSubmit = async () => {
    if (!isReady) return
    try {
      await RoomService.unsubmit(roomId, session.id)
      setReady(false)
    } catch (e) {
      console.error(e)
      notification!.api.show({
        title: 'API_CALL_ERROR',
      })
    }
  }

  const submit = async () => {
    if (isReady) return
    console.log('draw state timeout...')
    const image = drawStore.current
    if (!image) {
      throw new Error('error ...')
    }
    try {
      await RoomService.submitRoundData(roomId, session.id, {
        type: 'image',
        data: image.data,
      })
      setReady(true)
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
      <div className="w-2/3 h-full flex flex-col justify-center items-center">
        <GameHeaderComponent
          className="w-full h-20 mb-3"
          onTimeoutCallback={onTimeout}
        />
        <div className="w-full p-4 rounded-lg shadow-md h-[80%]">
          <PaintApp
            store={drawStore}
            submit={onSubmitEvent}
            isComplete={isReady}
          />
        </div>
      </div>
    </div>
  )
}

export default GameDrawState
