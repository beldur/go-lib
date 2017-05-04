import * as rules from './rules'

describe('Rules', () => {
  it('should check if a move is on the board', () => {
    const inBoard = rules.isCoordinateOnBoard({ x: 2, y: 4 }, 9)

    expect(inBoard).toBe(true)

    const edgeMax = rules.isCoordinateOnBoard({ x: 10, y: 10 }, 9)
    const edgeMin = rules.isCoordinateOnBoard({ x: 0, y: 0 }, 9)

    expect(edgeMax).toBe(false)
    expect(edgeMin).toBe(false)
  })
})
