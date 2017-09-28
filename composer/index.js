import * as FP from './logic/FP.js'
import * as IO from './logic/IO.js'
import * as Rendering from './logic/Rendering.js'

const $_trace = str => x =>
	(FP.$_log(str + ':', x), x)

const $_getStatus = IO.get('https://jsonp.afeld.me/?url=http%3A%2F%2Fwebflow.com%2Fstatus')


const $_main =
  FP.compose(
    FP.map($_trace('delayed status')),
    FP.map(FP.delay(200)),
    FP.map($_trace('status')),
    $_getStatus,
    $_trace('input value'))

$_main()
