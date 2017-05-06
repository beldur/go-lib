import * as util from './util'

describe('Util', () => {
  describe('range()', () => {
    it('should return correct array', () => {
      const expected = [0, 1, 2]
      const range = util.range(3)

      expect(range).toEqual(expect.arrayContaining(expected))
    })

    it('should start at correct value', () => {
      const expected = [10, 11, 12]
      const range = util.range(3, 10)

      expect(range).toEqual(expect.arrayContaining(expected))
    })
  })

  describe('eachBoardCoordinate()', () => {
    it('should call `callback` x amount of times', () => {
      const spy = jest.fn()
      util.eachBoardCoordinate(3, spy)

      expect(spy).toHaveBeenCalledTimes(9)
    })
  })
})
