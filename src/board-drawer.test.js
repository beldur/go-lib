import BoardDrawer from './board-drawer.js'

let canvas2dContextMock

export const newCanvas2dContextMock = () => ({
  save: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  fillText: jest.fn(),
  arc: jest.fn(),
  clearRect: jest.fn(),
  fillRect: jest.fn(),
})

describe('BoardDrawer', () => {
  beforeEach(() => {
    canvas2dContextMock = newCanvas2dContextMock()
  })

  it('should calculate correct star points', () => {
    const starPoints5 = new BoardDrawer(5, 100, 100).calculateStars()
    expect(starPoints5.length).toBe(1)

    const starPoints9 = new BoardDrawer(9, 100, 100).calculateStars()
    expect(starPoints9.length).toBe(9)

    const starPoints19 = new BoardDrawer(19, 100, 100).calculateStars()
    expect(starPoints19.length).toBe(9)
  })

  it('should render all star points', () => {
    const drawer = new BoardDrawer(19, 100, 100)
    drawer.starPoints(canvas2dContextMock)

    expect(canvas2dContextMock.arc.mock.calls.length).toBe(9)
  })

  it('should render all grid lines', () => {
    const drawer = new BoardDrawer(19, 100, 100)
    drawer.grid(canvas2dContextMock)

    expect(canvas2dContextMock.lineTo.mock.calls.length).toBe(19 * 2)
  })

  it('should render correct amount of stones', () => {
    const drawer = new BoardDrawer(19, 100, 100)
    const moves = [
      { pos: [16, 4], color: 'B' },
      { pos: [4, 16], color: 'W' },
      { pos: [16, 17], color: 'B' },
    ]

    drawer.stones(canvas2dContextMock, moves)
    expect(canvas2dContextMock.arc.mock.calls.length).toBe(4)

    canvas2dContextMock.arc.mockClear()

    drawer.stones(canvas2dContextMock, [])
    expect(canvas2dContextMock.arc.mock.calls.length).toBe(0)
  })

  it('should render all coordinates', () => {
    const drawer = new BoardDrawer(19, 100, 100)
    drawer.coordinates(canvas2dContextMock)

    expect(canvas2dContextMock.fillText.mock.calls.length).toBe(19 * 2)
  })
})
