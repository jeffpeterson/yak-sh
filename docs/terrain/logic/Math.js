import {compose, map, multiply as mult} from '../../lib/logic/FP.js'

/// multiply(10)([1,2,3]) -> [10,20,30]
export const multiply = compose(map, mult)
