// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SVGInject from '@iconfu/svg-inject'
import { useEffect } from 'react'

import { listTool } from '../../meta'
import Eraser from './assets/eraser.svg'
import FillColor from './assets/fill-color.svg'
import Pencil from './assets/pencil.svg'

export type PenSelectorProps = {
  tool: string
  size: number
  setTool: (t: string) => void
  setSize: (t: number) => void
}

function changeActiveColorToolIcon(active_tool: string) {
  //   console.log(active_tool)
  const elements = document.getElementsByClassName('draw-tool-icon')
  if (elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      const el = elements.item(i)
      if (el) {
        const elToolData = el.getAttribute('data-tool')
        // console.log(el)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore

        el.style.fill = elToolData === active_tool ? 'green' : 'black'
      }
    }
  }
}

const assetsSelector = (t: string) => {
  switch (t) {
    case 'pencil': {
      return Pencil
    }
    case 'fill-color': {
      return FillColor
    }
    case 'eraser': {
      return Eraser
    }
    default:
      return ''
  }
}

const PenSelector = ({ tool, setTool, size, setSize }: PenSelectorProps) => {
  useEffect(() => {
    changeActiveColorToolIcon(tool)
  }, [tool])
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-[60%] h-full flex flex-row justify-between items-center">
        {listTool.map((t) => {
          return (
            <div
              key={t}
              className="mx-2 hover:opacity-75 cursor-pointer"
              onClick={() => {
                setTool(t)
              }}
            >
              <img
                src={assetsSelector(t)}
                width={40}
                height={40}
                alt="Draw tool"
                className="draw-tool-icon"
                data-tool={`${t}`}
                onLoad={(e) => {
                  SVGInject(e.target, {
                    onAllFinish: () => {
                      changeActiveColorToolIcon(tool)
                    },
                  })
                }}
              />
            </div>
          )
        })}
      </div>
      <div className="w-[40%] h-full flex flex-col justify-center items-center">
        <div>
          <p>size</p>
        </div>
        <div>
          {[1, 5, 10].map((s) => {
            return (
              <div key={`size-${s}`} className="flex items-center">
                <input
                  type="radio"
                  name="stroke-size"
                  id={`stroke-size-${s}`}
                  value={s}
                  checked={s === size}
                  className="form-radio text-blue-500 h-4 w-4"
                  onChange={() => {
                    setSize(s)
                  }}
                />
                <label
                  htmlFor={`stroke-size-${s}`}
                  className="ml-2 text-gray-700"
                >
                  {s}
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PenSelector
