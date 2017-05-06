import BoardDrawer from './board-drawer'

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
      { coordinate: { x: 16, y: 4 }, color: 'B' },
      { coordinate: { x: 4, y: 16 }, color: 'W' },
      { coordinate: { x: 16, y: 17 }, color: 'B' },
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

  it('should calculate correct board coordinate from mouse position', () => {
    const drawer = new BoardDrawer(19, 100, 100)
    const mousePosition = { x: 50, y: 50 }
    const coordinate = drawer.calculateCoordinateFromMousePosition(
      mousePosition,
    )

    expect(coordinate).toEqual({ x: 10, y: 10 })
  })
})
