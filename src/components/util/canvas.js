// @flow

export const calculateMousePosition = (
  canvas: HTMLCanvasElement,
  event: MouseEvent,
) => {
  const bcr = canvas.getBoundingClientRect()

  return {
    x: event.clientX - bcr.left,
    y: event.clientY - bcr.top,
  }
}
