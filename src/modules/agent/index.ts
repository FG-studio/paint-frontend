import { MsgBus } from '../../lib'

export type RoomEventMsgType =
  | 'user_join'
  | 'user_leave'
  | 'config_changed'
  | 'state_changed'
  | 'user_state_changed'
  | 'next_sumary'

type RoomEvent<T> = {
  channel: string
  type: RoomEventMsgType
  data: T
}

export class WebsocketAgent {
  private _connection: WebSocket
  private _pingInterval: NodeJS.Timeout | undefined
  constructor(private _url: string) {
    this._connection = new WebSocket(this._url)
    this._connection.onopen = this.onConnect
    this._connection.onclose = this.onDisconnect
    this._connection.onerror = this.onError
    this._connection.onmessage = this.onMessage
  }

  onConnect = () => {
    this._pingInterval = setInterval(() => {
      this._connection.send('ping')
    }, 30000)
  }

  onDisconnect = () => {
    this.destroy()
  }

  onError = () => {
    this.destroy()
  }

  onMessage = (msg: MessageEvent<any>) => {
    const { data } = msg
    if (data === 'pong') {
      return
    }
    try {
      const payload = JSON.parse(data as string) as RoomEvent<any>
      console.log('on socket msg', payload)
      MsgBus.Instance.publish(payload.channel, {
        data: payload.data,
        type: payload.type,
      })
    } catch (e) {
      console.error(`error when parse socket message`, e)
    }
  }

  destroy = () => {
    if (this._connection.readyState === WebSocket.OPEN) {
      this._connection.close()
    }
    if (this._pingInterval) {
      clearInterval(this._pingInterval)
    }
  }
}
