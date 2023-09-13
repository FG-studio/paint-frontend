import { useGameHook } from './game.hooks'
import GameStateView from './state'
import { GameContext } from './store'

const GameScreen = () => {
  const { gameStore } = useGameHook()
  return (
    <>
      <GameContext.Provider value={gameStore}>
        <div className="h-screen w-screen">
          <GameStateView />
        </div>
      </GameContext.Provider>
    </>
  )
}

export default GameScreen
