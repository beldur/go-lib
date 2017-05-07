// @flow

import type { Color } from 'go-lib'
import * as util from './util'
import { BLACK, WHITE } from './constants'

const rand63 = () => Math.floor(Math.random() * 9223372036854775807)

class Zobrist {
  table: Array<Array<number>>
  sum: number
  tableSize: number

  constructor(tableSize: number) {
    this.tableSize = tableSize
    this.table = util
      .range(tableSize * tableSize)
      .map(_ => [rand63(), rand63()])
    this.sum = 0
  }

  hash(x: number, y: number, color: Color): number {
    const tableIndex = this.tableSize * x + y
    const index = color === BLACK ? 0 : 1

    this.sum ^= this.table[tableIndex][index]

    return this.sum
  }

  getHash() {
    return this.sum
  }
}

export default Zobrist
