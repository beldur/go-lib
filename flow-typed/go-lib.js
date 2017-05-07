// @flow

declare module 'go-lib' {
  declare type Coordinate = {
    x: number,
    y: number,
  }

  declare type Color = 'W' | 'B'

  declare type Move = {
    coordinate: Coordinate,
    color: Color,
  }

  declare type BoardStatus = Color | 'EMPTY'
}
