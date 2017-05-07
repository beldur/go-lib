import Board from './board'
import * as util from './util'
import { EMPTY, WHITE } from './constants'

describe('Board', () => {
  it('should clear the board', () => {
    const expected = util.range(9 * 9).map(() => EMPTY)
    const board = new Board(9)
    board.clear()

    expect(board.data).toEqual(expected)
  })

  it('should set und get a boardstatus correctly', () => {
    const board = new Board(9)
    board.setStatus(3, 3, WHITE)

    expect(board.getStatus(3, 3)).toBe(WHITE)
    expect(board.getStatus(3, 4)).toBe(EMPTY)
  })
})
