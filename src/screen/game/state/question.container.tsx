import { useContext, useState } from 'react'
import { useStore } from 'zustand'

import Button from '../../../components/button/button'
import TextInput from '../../../components/input/text-input'
import { useNotificationContext } from '../../../components/notification-popup/notification-context'
import * as RoomService from '../../../services/room.service'
import GameHeaderComponent from '../components/header.component'
import UserListComponent from '../components/user-list.component'
import { GameContext } from '../store'

const GameQuestionState = () => {
  const [question, setQuestion] = useState('')
  const [complete, setComplete] = useState(false)
  const notification = useNotificationContext()
  const store = useContext(GameContext)
  const roomId = useStore(store!, (s) => s.id)
  const session = useStore(store!, (s) => s.session)
  const submitData = async () => {
    if (complete) return
    try {
      await RoomService.submitRoundData(roomId, session.id, {
        type: 'text',
        data: question,
      })
      setComplete(true)
    } catch (e) {
      console.error(e)
      notification!.api.show({
        title: 'API_CALL_ERROR',
      })
    }
  }
  const unsubmitData = async () => {
    if (!complete) return
    try {
      await RoomService.unsubmit(roomId, session.id)
      setComplete(false)
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
    if (complete) return unsubmitData()
    else return submitData()
  }
  return (
    <div className="h-full w-full px-10 py-10 flex flex-row justify-center items-center">
      <UserListComponent className="w-1/3 h-full" />
      <div className="w-2/3 h-full flex flex-col justify-center items-center">
        <GameHeaderComponent
          className="w-full h-20 mb-3"
          onTimeoutCallback={onTimeout}
        />
        <div className="flex flex-col justify-center items-center p-8 rounded-lg shadow-md w-full h-[90%]">
          <div className="w-full">
            <div>
              <h3>Hãy viết ra một cụm từ bất kỳ</h3>
            </div>
            <div>
              <TextInput value={question} onChange={setQuestion} />
            </div>
            <div className="w-full flex flex-col items-end py-3">
              <div className="w-36">
                <Button variant="primary" onClick={onSubmitClick}>
                  Xác nhận
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameQuestionState
