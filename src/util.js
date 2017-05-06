// @flow

// range creates an array of given size
export const range = (size: number, start: number = 0) =>
  Array.from(Array(size), (_, i) => i + start)

// eachBoardCoordinate call's `callback` for each board coordinate
export const eachBoardCoordinate = (
  boardSize: number,
  callback: (x: number, y: number) => void,
) =>
  range(boardSize, 1).forEach(x =>
    range(boardSize, 1).forEach(y => callback(x, y)),
  )
