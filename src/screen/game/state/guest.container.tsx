import { useContext, useState } from 'react'
import { useStore } from 'zustand'

import Button from '../../../components/button/button'
import TextInput from '../../../components/input/text-input'
import { useNotificationContext } from '../../../components/notification-popup/notification-context'
import * as RoomService from '../../../services/room.service'
import GameHeaderComponent from '../components/header.component'
import UserListComponent from '../components/user-list.component'
import { GameContext } from '../store'

const GameGuestState = () => {
  const store = useContext(GameContext)
  const [answer, setAnswer] = useState('')
  const [isComplete, complete] = useState(false)
  const prevData = useStore(store!, (s) => s.prevData)
  const notification = useNotificationContext()
  const roomId = useStore(store!, (s) => s.id)
  const session = useStore(store!, (s) => s.session)
  const submitData = async () => {
    if (isComplete) return
    try {
      await RoomService.submitRoundData(roomId, session.id, {
        type: 'text',
        data: answer,
      })
      complete(true)
    } catch (e) {
      console.error(e)
      notification!.api.show({
        title: 'API_CALL_ERROR',
      })
    }
  }
  const unsubmitData = async () => {
    if (!isComplete) return
    try {
      await RoomService.unsubmit(roomId, session.id)
      complete(false)
    } catch (e) {
      console.error(e)
      notification!.api.show({
        title: 'API_CALL_ERROR',
      })
    }
  }
  const onTimeout = async () => {
    await submitData()
  }
  const onSubmitClick = async () => {
    if (isComplete) return unsubmitData()
    else return submitData()
  }
  return (
    <div className="h-full w-full px-10 py-10 flex flex-row justify-between items-center">
      <UserListComponent className="w-1/3 h-full" />
      <div className="w-2/3 h-full">
        <GameHeaderComponent
          className="w-full h-20 mb-3"
          onTimeoutCallback={onTimeout}
        />
        <div className="w-full p-4 rounded-lg shadow-md h-[90%] flex flex-col justify-center items-center">
          <div className="h-3/4 p-2 w-full">
            {prevData ? (
              prevData.type === 'image' ? (
                <img
                  className="w-full h-full object-contain"
                  src={prevData.value}
                  alt="data-for-draw"
                />
              ) : (
                <p>{prevData.value}</p>
              )
            ) : null}
          </div>
          <div className="flex flex-row items-center justify-center h-1/4 w-full">
            <div className="w-[90%]">
              <TextInput
                placeholder="Hãy nhập đáp án của bạn"
                value={answer}
                onChange={setAnswer}
                disabled={isComplete}
              />
            </div>
            <div className="p-4 w-[10%]">
              <Button
                className="flex items-center"
                variant={`${isComplete ? 'secondary' : 'primary'}`}
                onClick={onSubmitClick}
              >
                {isComplete ? 'edit' : 'save'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameGuestState
