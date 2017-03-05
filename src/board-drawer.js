// @flow

import type { Move, Point } from './types.js'

const LINE_WIDTH_FACTOR = 20
const FONT_SIZE_FACTOR = 2.5
const STAR_POINT_SIZE_FACTOR = 8
const BACKGROUND_COLOR = 'rgb(251, 196, 103)'

// BoardDrawer exposes functions for drawing a go board on a 2d context
class BoardDrawer {
  boxSize: number
  lineWidth: number
  fontSize: number
  width: number
  height: number
  boardSize: number
  stars: Array<Point>

  constructor(boardSize: number, width: number, height: number) {
    this.boxSize = width / (boardSize + 1)
    this.lineWidth = this.boxSize / LINE_WIDTH_FACTOR
    this.fontSize = this.boxSize / FONT_SIZE_FACTOR
    this.width = width
    this.height = height
    this.boardSize = boardSize
    this.stars = this.calculateStars()
  }

  calculateStars() {
    const { boardSize, boxSize } = this
    const starPos = boardSize === 9 ? 3 : 4
    const single = starPos * boxSize
    const double = ((boardSize + 1) / 2) * boxSize
    const triple = (boardSize + 1 - starPos) * boxSize
    const stars = [{ x: double, y: double }]

    if (boardSize % 2 !== 0 && boardSize > 7) {
      stars.push(
        // TopLeft
        { x: single, y: single },
        // Left
        { x: single, y: double },
        // BottomLeft
        { x: single, y: triple },
        // BottomMiddle
        { x: double, y: triple },
        // TopMiddle
        { x: double, y: single },
        // TopRight
        { x: triple, y: single },
        // MiddleRight
        { x: triple, y: double },
        // BottomRight
        { x: triple, y: triple },
      )
    }

    return stars
  }

  clear(ctx: CanvasRenderingContext2D) {
    const { width, height } = this

    ctx.save()
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, width, height)
    ctx.restore()
  }

  stones(ctx: CanvasRenderingContext2D, moves: Array<Move>) {
    const { lineWidth, boxSize } = this

    ctx.save()
    ctx.lineWidth = lineWidth * 2

    moves.forEach((move, index) => {
      const isLastMove = index === moves.length - 1

      // Draw stone
      ctx.fillStyle = (move.color === 'B') ? '#000' : '#FFF'
      ctx.beginPath()
      ctx.arc(move.pos[0] * boxSize, move.pos[1] * boxSize, boxSize / 2, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.fill()

      // Mark last move
      if (isLastMove) {
        ctx.beginPath()
        ctx.fillStyle = (move.color === 'B') ? '#FFF' : '#000'
        ctx.lineWidth = lineWidth
        ctx.arc(move.pos[0] * boxSize, move.pos[1] * boxSize, boxSize / 3.5, 0, 2 * Math.PI)
        ctx.stroke()
      }
    })

    ctx.restore()
  }

  grid(ctx: CanvasRenderingContext2D) {
    const { lineWidth, boxSize, width, height, boardSize } = this

    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = lineWidth

    for (let i = 1; i <= boardSize; i++) {
      ctx.moveTo(i * boxSize, boxSize)
      ctx.lineTo(i * boxSize, height - boxSize)
      ctx.moveTo(boxSize, i * boxSize)
      ctx.lineTo(width - boxSize, i * boxSize)
    }

    ctx.stroke()
    ctx.restore()
  }

  starPoints(ctx: CanvasRenderingContext2D) {
    const { boxSize, boardSize, stars } = this

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = '#000'

    stars.forEach((pos) => {
      ctx.moveTo(pos.x, pos.y)
      ctx.arc(pos.x, pos.y, boxSize / STAR_POINT_SIZE_FACTOR, 0, 2 * Math.PI)
    })

    ctx.fill()
    ctx.restore()
  }

  coordinates(ctx: CanvasRenderingContext2D) {
    const { boxSize, fontSize, boardSize } = this

    ctx.save()
    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'
    ctx.fillStyle = '#000'

    for (let i = 1; i <= boardSize; i++) {
      ctx.fillText(String.fromCharCode(64 + i), i * boxSize, boxSize / 2)
      ctx.fillText(`${boardSize - i + 1}`, boxSize / 2, i * boxSize + 3)
    }

    ctx.restore()
  }

  draw(ctx: CanvasRenderingContext2D, moves: Array<Move>) {
    this.clear(ctx)
    this.grid(ctx)
    this.coordinates(ctx)
    this.starPoints(ctx)
    this.stones(ctx, moves)
  }
}

export default BoardDrawer
