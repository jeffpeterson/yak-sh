import * as FP from './logic/FP.js'
import * as IO from './logic/IO.js'
import * as Rendering from './logic/Rendering.js'

const $_trace = str => x =>
	(FP.$_log(str + ':', x), x)

const $_getData = IO.get('data.json')


const $_main =
  FP.compose(
    FP.map($_trace('delayed data')),
    FP.map(FP.delay(3000)),
    FP.map($_trace('data')),
    $_getData)

$_main()
