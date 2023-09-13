import { useContext } from 'react'
import { AiOutlineRollback } from 'react-icons/ai'
import { useStore } from 'zustand'

import Button from '../../../components/button/button'
import CoolDownComponent from '../../../components/cooldown/cooldown'
import { GameContext } from '../store'

export type GameHeaderComponent = {
  className?: string
  title?: string
  onTimeoutCallback?: () => any
  onBack?: () => void
}

const GameHeaderComponent = ({
  title,
  className,
  onTimeoutCallback,
  onBack,
}: GameHeaderComponent) => {
  const store = useContext(GameContext)
  const timeout = useStore(store!, (s) => s.phaseTimeout)
  const round = useStore(store!, (s) => s.round)
  return (
    <>
      <div className={`${className ? className : ''} min-h-[5rem]`}>
        <div className="w-full h-full p-4 rounded-lg shadow-md flex flex-row justify-around items-center">
          <div className="flex flex-row w-1/3 h-full justify-center items-start">
            <div className="flex flex-col justify-center items-center h-full">
              {onBack ? (
                <Button onClick={onBack}>
                  <AiOutlineRollback size={25} />
                </Button>
              ) : null}
            </div>
            <div className="flex flex-col justify-center items-center h-full">
              <p>{title || null}</p>
            </div>
          </div>
          <div className="flex flex-col w-1/3 h-full justify-center items-center">
            <p>{round ? `Round ${round}` : ''}</p>
          </div>
          <div className="flex flex-col w-1/3 h-full relative justify-center items-end">
            {timeout ? (
              <CoolDownComponent
                duractionSec={timeout}
                onEnded={onTimeoutCallback}
                size={35}
                strokeWidth={5}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default GameHeaderComponent
