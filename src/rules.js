// @flow

import type { Coordinate } from 'go-lib'

export const isCoordinateOnBoard = (
  coordinate: Coordinate,
  boardSize: number,
) =>
  coordinate.x > 0 &&
  coordinate.y > 0 &&
  coordinate.x <= boardSize &&
  coordinate.y <= boardSize
