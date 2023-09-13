import { listColor } from '../../meta'

export type ColorPanelProps = {
  color: string
  onColorSelected: (color: string) => void
}

const ColorPanel = ({ color, onColorSelected }: ColorPanelProps) => {
  return (
    <div className="h-full w-full flex flex-row justify-between items-center">
      <div className="flex justify-center items-center mx-2">
        <div
          className="h-10 w-10 border border-gray-500"
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <div>
        <div className="grid grid-cols-6 grid-rows-4 gap-4">
          {listColor.map((c) => {
            return (
              <div
                key={c}
                className="w-4 h-4 border border-gray-500 hover:opacity-75 cursor-pointer"
                style={{ backgroundColor: c }}
                onClick={() => {
                  onColorSelected(c)
                }}
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ColorPanel
