import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/button/button'
import TextInput from '../../components/input/text-input'
import Modal from '../../components/modal/modal'
import { useNotificationContext } from '../../components/notification-popup/notification-context'
import { makeUniqueId } from '../../helpers'
import { PersistanceStore } from '../../lib'
import * as RoomService from '../../services/room.service'

const LobbyScreen = () => {
  const navigate = useNavigate()
  const notification = useNotificationContext()
  const [session, setSession] = useState<
    { name: string; id: string } | undefined
  >(PersistanceStore.Instance.getObj('session'))
  const [isShow, show] = useState(false)
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('')
  useEffect(() => {
    if (session) {
      setUsername(session.name)
    }
  }, [])
  const initSession = () => {
    const tmpSession = {
      id: makeUniqueId(),
      name: username,
    }
    setSession(tmpSession)
    PersistanceStore.Instance.setObj('session', tmpSession)
    return tmpSession
  }
  const joinRoom = async (): Promise<void> => {
    const tmpSession = initSession()

    try {
      const room = await RoomService.joinRoom(roomId, {
        user_id: tmpSession.id,
        username: username,
      })
      PersistanceStore.Instance.set('pubsub_channel', room.channel)

      navigate(`/game?room=${room.room.id}`)
    } catch (e) {
      console.error('error when call api', e)
      notification!.api.show({
        type: 'error',
        title: 'API_CALL_ERROR',
      })
    }
  }
  const createRoom = async () => {
    const tmpSession = initSession()
    try {
      const room = await RoomService.createRoom({
        user_id: tmpSession.id,
        username: tmpSession.name,
      })
      PersistanceStore.Instance.set('pubsub_channel', room.channel)
      navigate(`/game?room=${room.room.id}`)
    } catch (e) {
      console.error('error when call api', e)
      notification!.api.show({
        type: 'error',
        title: 'API_CALL_ERROR',
      })
    }
  }
  const onJoinRoomClicked = () => {
    show(true)
  }
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Lobby</h2>
          <div className="">
            <div className="py-4 w-full">
              <TextInput
                className="w-full"
                placeholder="Enter your name"
                value={username}
                onChange={(data: string) => setUsername(data)}
              />
            </div>
            <div className="flex flex-row items-center justify-end">
              <Button className="mx-2" variant="primary" onClick={createRoom}>
                Create Room
              </Button>
              <Button
                className="mx-2"
                variant="secondary"
                onClick={onJoinRoomClicked}
              >
                Join Room
              </Button>
            </div>
          </div>
        </div>
        <Modal
          open={isShow}
          onClose={() => show(false)}
          title="Join Room"
          onOk={() => joinRoom()}
        >
          <div className="w-full h-full">
            <TextInput
              placeholder="Enter room id"
              value={roomId}
              onChange={(data) => setRoomId(data)}
            />
          </div>
        </Modal>
      </div>
    </>
  )
}

export default LobbyScreen
