import {trace} from "../lib/logic/Debug.js"
import {figure1} from './color.js'

figure1("./the-first-fires.jpg")
.fork(trace("rejected"), ctx => {
  window.figure1.appendChild(ctx.canvas)
})
