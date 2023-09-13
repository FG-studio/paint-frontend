import { useEffect, useState } from 'react'

import { secToMinuteStr } from '../../helpers'
import CircleProgressBar from '../circle-progress-bar/circle-progress-bar'

export type CoolDownProps = {
  duractionSec: number
  onEnded?: () => void | Promise<void>
  size?: number
  strokeWidth?: number
}

const CoolDownComponent = ({
  duractionSec,
  onEnded,
  size,
  strokeWidth,
}: CoolDownProps) => {
  const [cd, setCd] = useState(duractionSec)
  //   const [progress, setProgress] = useState(100)
  useEffect(() => {
    if (cd > 0) {
      const interval = setInterval(() => {
        setCd((prevCd) => prevCd - 1)
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    } else {
      if (onEnded) onEnded()
    }
  }, [cd, onEnded])
  const progress = ((duractionSec - cd) / duractionSec) * 100

  return (
    <div className="relative inline-block text-center">
      <CircleProgressBar
        percent={progress}
        titleStyle={'text-cyan-500'}
        sqSize={size}
        strokeWidth={strokeWidth}
        title={`${secToMinuteStr(cd)}`}
      />
    </div>
  )
}

export default CoolDownComponent
