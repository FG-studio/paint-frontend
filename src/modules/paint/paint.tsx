import { useEffect, useRef, useState } from 'react'
import { FaRedo, FaTrash, FaUndo } from 'react-icons/fa'

import Button from '../../components/button/button'
import { MemetoStore } from '../../lib'
import ColorPanel from './components/color-panel'
import PenSelector from './components/pen-selector'
import {
  canvasFloodFill,
  CanvasState,
  hex2Rgb,
  listColor,
  listTool,
  Position,
} from './meta'

const drawFromState = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: CanvasState,
): Promise<void> => {
  return new Promise((resolve) => {
    const pic = new Image()
    pic.src = state.data
    pic.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (state.data !== '')
        ctx.drawImage(
          pic,
          0,
          0,
          state.w,
          state.h,
          0,
          0,
          canvas.width,
          canvas.height,
        )
      resolve()
    }
  })
}

export type PaintAppProps = {
  store: MemetoStore<CanvasState>
  submit?: () => void
  isComplete?: boolean
}

const PaintApp = ({ store, isComplete, submit }: PaintAppProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState(listColor[0])
  const [tool, setTool] = useState(listTool[0])
  const [size, setSize] = useState(1)
  const [canvasCtx, setCanvasCtx] = useState<
    CanvasRenderingContext2D | undefined
  >(undefined)
  const [disabled, setDisabled] = useState(false)
  // const [store] = useState(() => new MemetoStore<CanvasState>())
  useEffect(() => {
    console.log('change abcd')
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')

    canvas.width = canvas.parentElement!.clientWidth
    canvas.height = canvas.parentElement!.clientHeight

    if (!context) return
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
    clear()
  }, [])

  const onSubmitButtonClicked = () => {
    if (submit) submit()
  }

  const getDrawState = (): CanvasState | undefined => {
    const canvas = canvasRef.current
    if (!canvas) return

    const data = canvasRef.current.toDataURL('image/png')
    return {
      w: canvas.width,
      h: canvas.height,
      data,
    }
  }

  const loadImageWrapper = async (
    getCanvasState: () => CanvasState | undefined,
  ) => {
    if (canvasCtx) {
      return
    }

    if (!canvasRef || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const state = getCanvasState()
    if (!state) return
    setDisabled(true)
    setCanvasCtx(ctx)
    await drawFromState(canvasRef.current, ctx, state)
    setCanvasCtx(undefined)
    setDisabled(false)
  }

  const save = () => {
    const state = getDrawState()
    if (!state) return
    store.save(state)
  }

  const undo = async (): Promise<void> => {
    return loadImageWrapper(store.undo)
  }

  const redo = async (): Promise<void> => {
    return loadImageWrapper(store.redo)
  }

  const clear = () => {
    if (canvasCtx) {
      return
    }

    if (!canvasRef || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    save()
  }

  const onDrawStarted = (pos: Position) => {
    // console.log(pos)
    if (disabled) return
    if (canvasCtx) {
      return
    }

    if (!canvasRef || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    switch (tool) {
      case 'pencil': {
        ctx.globalCompositeOperation = 'source-over'
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = color
        ctx.lineWidth = size

        setCanvasCtx(ctx)

        ctx.beginPath()
        ctx.moveTo(pos.x, pos.y)
        break
      }
      case 'eraser': {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.lineWidth = size

        setCanvasCtx(ctx)
        break
      }
      case 'fill-color':
        canvasFloodFill(canvasRef.current, ctx, pos, hex2Rgb(color))
        save()
        break
      default:
        break
    }
  }
  const onDrawUpdated = (pos: Position) => {
    // console.log(pos)
    if (!canvasCtx) return

    canvasCtx.lineTo(pos.x, pos.y)
    canvasCtx.stroke()
  }
  const onDrawEnded = () => {
    if (!canvasRef || !canvasRef.current) return
    if (!canvasCtx) return

    canvasCtx.closePath()
    save()
    setCanvasCtx(undefined)
  }
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-[70%]">
        <canvas
          ref={canvasRef}
          onMouseUp={() => {
            onDrawEnded()
          }}
          onMouseDown={(e: React.MouseEvent) => {
            onDrawStarted({
              x: e.clientX - canvasRef.current!.getBoundingClientRect().left,
              y: e.clientY - canvasRef.current!.getBoundingClientRect().top,
            })
          }}
          onMouseMove={(e: React.MouseEvent) => {
            onDrawUpdated({
              x: e.clientX - canvasRef.current!.getBoundingClientRect().left,
              y: e.clientY - canvasRef.current!.getBoundingClientRect().top,
            })
          }}
        />
      </div>
      <div className="w-full h-[29%] flex flex-row justify-between items-center">
        <div className="w-1/3 h-full mx-2">
          <PenSelector
            tool={tool}
            size={size}
            setTool={setTool}
            setSize={setSize}
          />
        </div>
        <div className="w-1/3 h-full mx-2">
          <ColorPanel color={color} onColorSelected={setColor} />
        </div>
        <div className="w-1/3 h-full flex flex-col items-center justify-center mx-2">
          <div className="w-full h-1/2 flex flex-row items-center justify-between">
            <div
              className="w-1/3 h-full flex justify-center items-center cursor-pointer hover:opacity-75"
              onClick={undo}
            >
              <FaUndo size={35} />
            </div>
            <div
              className="w-1/3 h-full flex justify-center items-center cursor-pointer hover:opacity-75"
              onClick={redo}
            >
              <FaRedo size={35} />
            </div>
            <div
              className="w-1/3 h-full flex justify-center items-center cursor-pointer hover:opacity-75"
              onClick={clear}
            >
              <FaTrash size={35} />
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="p-8 w-2/3">
              <Button
                className="flex flex-col items-center"
                variant={`${isComplete ? 'secondary' : 'primary'}`}
                onClick={onSubmitButtonClicked}
              >
                {isComplete ? 'edit' : 'save'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaintApp
