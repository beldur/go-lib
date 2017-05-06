// @flow

import type { Move, Coordinate } from 'go-lib'
import React from 'react'
import BoardDrawer from './util/board-drawer'
import * as canvas from './util/canvas'
import * as rules from '../rules'

type BoardDefaultProps = {
  size: number,
  positions: Array<Move>,
  hoverPositions: Array<Move>,
  onPositionClick: Coordinate => void,
  onPositionHover: (?Coordinate) => void,
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
    hoverPositions: [],
    onPositionClick: () => {},
    onPositionHover: () => {},
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
    const { positions, width, height, hoverPositions } = this.props
    const context = this.canvas.getContext('2d')

    this.canvas.width = width
    this.canvas.height = height

    if (context) {
      this.context = context
      this.drawer.draw(this.context, positions, hoverPositions)
    }
  }

  componentWillReceiveProps(nextProps: BoardProps) {
    const { positions, width, height, hoverPositions } = nextProps

    this.canvas.width = width
    this.canvas.height = height

    if (this.context) {
      this.drawer.draw(this.context, positions, hoverPositions)
    }
  }

  publishBoardPosition(
    cursorPosition: Coordinate,
    handler: Coordinate => void,
  ) {
    const boardCoordinate = this.drawer.calculateCoordinateFromMousePosition(
      cursorPosition,
    )

    if (rules.isCoordinateOnBoard(boardCoordinate, this.drawer.boardSize)) {
      handler(boardCoordinate)
    }
  }

  handleMouseClick = (e: MouseEvent) => {
    const mousePosition = canvas.calculateCanvasPosition(
      this.canvas,
      e.clientX,
      e.clientY,
    )

    this.publishBoardPosition(mousePosition, this.props.onPositionClick)
  }

  handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault()

    const touch = e.changedTouches[0]
    const mousePosition = canvas.calculateCanvasPosition(
      this.canvas,
      touch.clientX,
      touch.clientY,
    )

    this.publishBoardPosition(mousePosition, this.props.onPositionClick)
  }

  handleMouseMove = (e: MouseEvent) => {
    const mousePosition = canvas.calculateCanvasPosition(
      this.canvas,
      e.clientX,
      e.clientY,
    )

    const boardCoordinate = this.drawer.calculateCoordinateFromMousePosition(
      mousePosition,
    )

    if (rules.isCoordinateOnBoard(boardCoordinate, this.drawer.boardSize)) {
      this.props.onPositionHover(boardCoordinate)
    } else {
      this.props.onPositionHover(null)
    }
  }

  handleMouseLeave = () => {
    this.props.onPositionHover(null)
  }

  render() {
    return (
      <canvas
        ref={c => (this.canvas = c)}
        onClick={this.handleMouseClick}
        onMouseMove={this.handleMouseMove}
        onTouchEnd={this.handleTouchEnd}
        onMouseLeave={this.handleMouseLeave}
      />
    )
  }
}

export default Board
