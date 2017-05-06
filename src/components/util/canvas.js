// @flow

import type { Coordinate } from 'go-lib'

export const calculateCanvasPosition = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
): Coordinate => {
  const bcr = canvas.getBoundingClientRect()

  return {
    x: x - bcr.left,
    y: y - bcr.top,
  }
}
