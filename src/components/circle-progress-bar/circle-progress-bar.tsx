export type CircleProgressBarProps = {
  percent: number
  sqSize?: number
  strokeWidth?: number
  title?: string
  bgColor?: string
  strColor?: string
  titleStyle?: string
}

const CircleProgressBar = ({
  percent,
  sqSize,
  strokeWidth,
  title,
  bgColor,
  titleStyle,
  strColor,
}: CircleProgressBarProps) => {
  const _sqSize = sqSize || 200
  const _strokeWidth = strokeWidth || 10
  const radius = (_sqSize - _strokeWidth) / 2
  const viewBox = `0 0 ${_sqSize} ${_sqSize}`
  const dashArray = radius * Math.PI * 2
  const dashOffset = dashArray - (dashArray * percent) / 100
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div>
          <svg width={_sqSize} height={_sqSize} viewBox={viewBox}>
            <circle
              className={`circle-background ${
                bgColor ? bgColor : 'stroke-gray-200'
              }`}
              style={{ fill: 'none' }}
              cx={_sqSize / 2}
              cy={_sqSize / 2}
              r={radius}
              strokeWidth={`${_strokeWidth}px`}
            />
            <circle
              className={`circle-progress ${
                strColor ? strColor : 'stroke-cyan-500'
              }`}
              cx={_sqSize / 2}
              cy={_sqSize / 2}
              r={radius}
              strokeWidth={`${_strokeWidth}px`}
              // Start progress marker at 12 O'Clock
              transform={`rotate(-90 ${_sqSize / 2} ${_sqSize / 2})`}
              style={{
                fill: 'none',
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }}
            />
            {/* <text
          className={`circle-text ${color ? color : 'fill-cyan-500'}`}
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          color="white"
          style={{
            fontSize: '3em',
            fontWeight: 'bold',
          }}
        >
          {title ? title : `${percent}%`}
        </text> */}
          </svg>
        </div>
        <div className={`${titleStyle ? titleStyle : ''}`}>
          <p>{title ? title : `${percent}%`}</p>
        </div>
      </div>
    </>
  )
}

export default CircleProgressBar
