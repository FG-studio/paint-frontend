import { Position, Rgba } from './types'

export function rgb2Hex(rgb: Rgba): string {
  const component2Hex = (c: number) => {
    const hex = c.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  return `#${component2Hex(rgb.r)}${component2Hex(rgb.g)}${component2Hex(
    rgb.r,
  )}`
}

export function hex2Rgb(s: string): Rgba {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 255,
      }
    : {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      }
}

export function canvasFloodFill(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  pos: Position,
  color: Rgba,
) {
  let { x, y } = pos
  const pixel_stack = [pos]
  console.log(canvas.width, canvas.height)
  ;(ctx as any).willReadFrequently = true
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let linear_cords = (y * canvas.width + x) * 4
  const original_color: Rgba = {
    r: pixels.data[linear_cords],
    g: pixels.data[linear_cords + 1],
    b: pixels.data[linear_cords + 2],
    a: pixels.data[linear_cords + 3],
  }

  while (pixel_stack.length > 0) {
    const new_pixel = pixel_stack.shift()
    if (!new_pixel) continue

    x = new_pixel.x
    y = new_pixel.y

    linear_cords = (y * canvas.width + x) * 4
    while (
      y-- >= 0 &&
      pixels.data[linear_cords] === original_color.r &&
      pixels.data[linear_cords + 1] === original_color.g &&
      pixels.data[linear_cords + 2] === original_color.b &&
      pixels.data[linear_cords + 3] === original_color.a
    ) {
      linear_cords -= canvas.width * 4
    }
    linear_cords += canvas.width * 4
    y++

    let reached_left = false
    let reached_right = false
    while (
      y++ < canvas.height &&
      pixels.data[linear_cords] === original_color.r &&
      pixels.data[linear_cords + 1] === original_color.g &&
      pixels.data[linear_cords + 2] === original_color.b &&
      pixels.data[linear_cords + 3] === original_color.a
    ) {
      pixels.data[linear_cords] = color.r
      pixels.data[linear_cords + 1] = color.g
      pixels.data[linear_cords + 2] = color.b
      pixels.data[linear_cords + 3] = color.a

      if (x > 0) {
        if (
          pixels.data[linear_cords - 4] === original_color.r &&
          pixels.data[linear_cords - 4 + 1] === original_color.g &&
          pixels.data[linear_cords - 4 + 2] === original_color.b &&
          pixels.data[linear_cords - 4 + 3] === original_color.a
        ) {
          if (!reached_left) {
            pixel_stack.push({ x: x - 1, y })
            reached_left = true
          }
        } else if (reached_left) {
          reached_left = false
        }
      }

      if (x < canvas.width - 1) {
        if (
          pixels.data[linear_cords + 4] === original_color.r &&
          pixels.data[linear_cords + 4 + 1] === original_color.g &&
          pixels.data[linear_cords + 4 + 2] === original_color.b &&
          pixels.data[linear_cords + 4 + 3] === original_color.a
        ) {
          if (!reached_right) {
            pixel_stack.push({ x: x + 1, y })
            reached_right = true
          }
        } else if (reached_right) {
          reached_right = false
        }
      }
      linear_cords += canvas.width * 4
    }
  }
  ctx.putImageData(pixels, 0, 0)
  ;(ctx as any).willReadFrequently = false
}
