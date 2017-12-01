import "../lib/control/Hacks.js"
import {cond, is} from '../logic/FP.js'
import {main} from './Composer.js'

cond([
  [is(Signal), sig =>
    sig.unsafeOnChange()],

  [is(Tree.Node), DOM.mount(document.body)],
])
