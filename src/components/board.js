// @flow

import type { Move, Coordinate } from 'go-lib'
import React from 'react'
import BoardDrawer from './util/board-drawer'
import * as canvas from './util/canvas'
import * as rules from '../rules'

type BoardDefaultProps = {
  size: number,
  positions: Array<Move>,
  onPositionClick: (coordinate: Coordinate) => void,
}

type BoardProps = BoardDefaultProps & {
  width: number,
  height: number,
}

// Board draw's a Go Board
class Board extends React.PureComponent<BoardDefaultProps, BoardProps, any> {
  static defaultProps = {
    size: 19,
    positions: [],
    onPositionClick: () => {},
  }

  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  drawer: BoardDrawer

  constructor(props: BoardProps) {
    super(props)

    const { size, width, height } = props

    this.drawer = new BoardDrawer(size, width, height)
  }

  componentDidMount() {
    const { positions, width, height } = this.props
    const context = this.canvas.getContext('2d')

    this.canvas.width = width
    this.canvas.height = height

    if (context) {
      this.context = context
      this.drawer.draw(this.context, positions)
    }
  }

  componentWillReceiveProps(nextProps: BoardProps) {
    const { positions } = nextProps

    if (this.context) {
      this.drawer.draw(this.context, positions)
    }
  }

  handleBoardClick = (e: MouseEvent) => {
    const mousePosition = canvas.calculateMousePosition(this.canvas, e)
    const boardCoordinate = this.drawer.calculateCoordinateFromMousePosition(
      mousePosition,
    )

    if (rules.isCoordinateOnBoard(boardCoordinate, this.drawer.boardSize)) {
      this.props.onPositionClick(boardCoordinate)
    }
  }

  render() {
    return (
      <canvas ref={c => (this.canvas = c)} onClick={this.handleBoardClick} />
    )
  }
}

export default Board
