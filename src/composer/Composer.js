import {map, compose} from "../lib/logic/FP.js"
import {get} from "../lib/logic/Networking.js"
import {div} from "../lib/logic/Tree.js"
import * as Rendering from "../lib/logic/Rendering.js"

const steps =
  [ value(yRatio),
    output(R.compose(setOpacity, mirror, flipRatio)),
    tap(setX),
  ]

export const main =
  compose(
  )
