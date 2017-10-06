import {compose} from '../logic/FP.js'

// Because JS needs a liiiiittle help to be good.

// Promises are almost a functor.
// Renaming then to map makes it so (almost):
Promise.prototype.map = Promise.prototype.then

// functions are functors too!
Function.prototype.map = function map(f) {
	return compose(f, this)
}
