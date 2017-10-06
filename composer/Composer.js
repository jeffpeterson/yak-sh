import {map, compose} from "./logic/FP.js"
import {get} from "./logic/Networking.js"
import {div} from "./logic/Tree.js"
import * as Rendering from "./logic/Rendering.js"

const steps =
  [ value(yRatio),
    output(R.compose(setOpacity, mirror, flipRatio)),
    tap(setX),
  ]

export const main =
  compose(
  )
