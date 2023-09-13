import { makeUniqueId, matchRuleShort } from '../helpers'

export type MsgBusCallback = <T>(data: T) => void

export class MsgBus {
  private static _ins: MsgBus | undefined
  public static get Instance(): MsgBus {
    if (!this._ins) {
      this._ins = new MsgBus()
    }
    return this._ins
  }
  private _channels: Map<string, Map<string, MsgBusCallback>>
  private constructor() {
    this._channels = new Map()
  }

  public register = (channel: string, callback: MsgBusCallback): string => {
    const listenerId = makeUniqueId()
    let channelListeners = this._channels.get(channel)
    if (!channelListeners) {
      channelListeners = new Map()
    }
    channelListeners.set(listenerId, callback)
    this._channels.set(channel, channelListeners)
    return listenerId
  }

  public unregister = (channel: string, listenerId: string): void => {
    const channelListeners = this._channels.get(channel)
    if (channelListeners) {
      channelListeners.delete(listenerId)
      if (channelListeners.size === 0) {
        this._channels.delete(channel)
      }
    }
  }

  public publish = <T>(channel: string, data: T): void => {
    const listChannel = [...this._channels.keys()]
    const listChannelMatched = listChannel.filter((c) =>
      matchRuleShort(channel, c),
    )
    listChannelMatched.forEach((c) => {
      const listenerMap = this._channels.get(c)
      if (listenerMap) {
        const listListener = [...listenerMap.values()]
        listListener.forEach((l) => l(data))
      }
    })
  }
}
