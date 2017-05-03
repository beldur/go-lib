// @flow

import type { Move } from 'go-lib'
import React from 'react'
import PropTypes from 'prop-types'
import BoardDrawer from './board-drawer.js'

type BoardDefaultProps = {
  size: number,
  moves: Array<Move>,
}

type BoardProps = BoardDefaultProps & {
  width: number,
  height: number,
}

// Board draw's a Go Board
class Board extends React.PureComponent<BoardDefaultProps, BoardProps, any> {
  static defaultProps: BoardDefaultProps

  props: BoardProps
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  drawer: BoardDrawer

  constructor(props: BoardProps) {
    super(props)

    const { size, width, height } = props

    this.drawer = new BoardDrawer(size, width, height)
  }

  componentDidMount() {
    const { moves, width, height } = this.props
    const context = this.canvas.getContext('2d')

    this.canvas.width = width
    this.canvas.height = height

    if (context) {
      this.context = context
      this.drawer.draw(this.context, moves)
    }
  }

  componentWillReceiveProps(nextProps: BoardProps) {
    const { moves } = nextProps

    if (this.context) {
      this.drawer.draw(this.context, moves)
    }
  }

  render() {
    return <canvas ref={c => (this.canvas = c)} />
  }
}

Board.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  size: PropTypes.number,
  moves: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.oneOf(['B', 'W']),
    }),
  ),
}

Board.defaultProps = {
  size: 19,
  moves: [],
}

export default Board
