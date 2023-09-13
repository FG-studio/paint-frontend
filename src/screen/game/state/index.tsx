import { useContext } from 'react'
import { useStore } from 'zustand'

import { GameContext } from '../store'
import { GameState } from '../types'
import GameDrawState from './draw.container'
import GameGuestState from './guest.container'
import GamePendingState from './pending.container'
import GamePredrawState from './predraw.container'
import GameQuestionState from './question.container'
import GameSumaryState from './sumary.container'

const GameStateView = () => {
  const store = useContext(GameContext)
  if (!store) return null
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const state = useStore(store, (s) => s.state)
  console.log('current state', state)
  switch (state) {
    case GameState.QUESTION:
      return <GameQuestionState />
    case GameState.PREDRAW:
      return <GamePredrawState />
    case GameState.DRAW:
      return <GameDrawState />
    case GameState.GUEST:
      return <GameGuestState />
    case GameState.SUMARY:
      return <GameSumaryState />
    default:
      return <GamePendingState />
  }
}

export default GameStateView
