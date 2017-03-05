import React from 'react'
import { shallow, render, mount } from 'enzyme'
import Board from './board.js'
import { newCanvas2dContextMock } from './board-drawer.test.js'

describe('Board', () => {
  it('should instantiate without errors', () => {
    const board = shallow(<Board width={500} height={500} />)
  })

  it('should set canvas width/height', () => {
    const board = mount(<Board width={500} height={400} />)
    const canvasNode = board.find('canvas').node

    expect(canvasNode.width).toBe(500)
    expect(canvasNode.height).toBe(400)
  })

  it('should redraw when props change', () => {
    const canvas2dContextMock = newCanvas2dContextMock()
    const board = shallow(<Board width={500} height={500} />)
    const boardInstance = board.instance()
    const spy = jest.spyOn(boardInstance.drawer, 'draw')

    boardInstance.context = canvas2dContextMock
    board.setProps({ width: 400 })

    expect(spy.mock.calls.length).toBe(1)
  })
})
