export type Rgba = {
  r: number
  g: number
  b: number
  a: number
}

export type Position = {
  x: number
  y: number
}

export type Size = {
  w: number
  h: number
}

export type CanvasState = {
  data: string
} & Size
