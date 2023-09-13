import { useContext } from 'react'
import { useStore } from 'zustand'

import GameHeaderComponent from '../components/header.component'
import UserListComponent from '../components/user-list.component'
import { GameContext } from '../store'
import { GameState } from '../types'

const GamePredrawState = () => {
  const store = useContext(GameContext)
  const prevData = useStore(store!, (s) => s.prevData)
  const config = useStore(store!, (s) => s.config)
  const setState = useStore(store!, (s) => s.setState)
  const onTimeout = () => {
    setState(GameState.DRAW, -1, config.drawDuration)
  }
  return (
    <div className="h-full w-full px-10 py-10 flex flex-row justify-between items-start">
      <UserListComponent className="w-1/3 h-full" />
      <div className="w-2/3 h-full flex flex-col justify-center items-center">
        <GameHeaderComponent
          className="w-full h-20"
          onTimeoutCallback={onTimeout}
        />
        <div className="w-full p-4 rounded-lg shadow-md h-[80%]">
          {prevData ? (
            <div className="h-full">
              {prevData.type === 'image' ? (
                <img src={prevData.value} alt="data-for-draw" />
              ) : (
                <p>{prevData.value}</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default GamePredrawState
