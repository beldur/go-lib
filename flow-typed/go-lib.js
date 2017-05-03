// @flow

declare module 'go-lib' {
  declare type Point = {
    x: number,
    y: number,
  }

  declare type Move = {
    pos: Point,
    color: 'W' | 'B',
  }
}
