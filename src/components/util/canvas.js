// @flow

import type { Coordinate } from 'go-lib'

// calculateCanvasPosition takes clientX/Y and returns the relative clientX/Y of the canvas
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
