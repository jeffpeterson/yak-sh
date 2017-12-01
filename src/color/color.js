import Task from "../lib/data/Task.js"
import {trace} from "../lib/logic/Debug.js"
import {chain, map, pipe, tap} from "../lib/logic/FP.js"

import {mapPixels} from "./logic/Pixel.js"
import {ybr} from "./logic/Color.js"

const getImage = src =>
  new Task((rej, res) => {
    const img = new Image()

    img.onerror = rej
    img.onload = () => { res(img) }
    img.src = src
  })

const onImageData = f => (x, y, w, h) => ctx => {
  ctx.putImageData(new ImageData(f(ctx.getImageData(x, y, w, h).data), w, h), x, y)

  return ctx
}

const createCanvas = (w, h) =>
  Task.try(() => {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    return canvas.getContext('2d')
  })

const draw = img => tap(ctx =>
  ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height))

const toCanvas = img =>
  createCanvas(800, 800)
  .map(draw(img))

const getCanvas = pipe(
  getImage,
  chain(toCanvas),
)

export const figure1 =
  pipe(
    getCanvas,
    map(onImageData(mapPixels(pipe(ybr)))(0, 0, 800, 800))
  )

export const figure2 =
  pipe(
    getCanvas,
    map(onImageData(mapPixels(pipe(ybr)))(0, 0, 800, 800))
  )
