// @flow

import type { BoardStatus } from 'go-lib'
import * as util from './util'
import { EMPTY } from './constants'

type BoardData = Array<BoardStatus>

class Board {
  data: BoardData = []
  boardSize: number

  constructor(boardSize: number) {
    this.boardSize = boardSize
    this.data = util.range(boardSize * boardSize).map(() => EMPTY)
  }

  clear() {
    this.data = this.data.map(() => EMPTY)
  }

  setStatus(x: number, y: number, status: BoardStatus) {
    const boardIndex = this.boardSize * x + y

    this.data = this.data.map((value, i) => (i === boardIndex ? status : value))
  }

  getStatus(x: number, y: number): BoardStatus {
    const boardIndex = this.boardSize * x + y

    return this.data[boardIndex]
  }
}

export default Board
