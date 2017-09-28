// Promises are similar to monads.
// Let's make them mappable:
Promise.prototype.map = Promise.prototype.then

// functions are functors too!
Function.prototype.map = function map(f) {
	return compose(f, this)
}

// NOTE: functions beginning with $_ have side-effects

export const $_log = (...xs) =>
	console.log(...xs)

export const isNil = x =>
	x == null

export const map = fn =>
	f => f.map(fn)

export const _compose = (f, g) => x =>
	f(g(x))

// composes a list of functions
export const compose = (...fs) =>
	fs.reduce(_compose)

// like compose, but in reversed order
export const pipe = (...fs) =>
  compose(...fs.reverse())

export const is = t => x =>
	x != null && x.constructor === t || x instanceof t

export const add = x => y =>
	y + x

export const subtract = x => y =>
	y - x

export const inc = add(1)
export const dec = subtract(1)

export const join = x => y =>
	y.join(x)

export const split = x => y =>
	y.split(x)

export const string = x =>
	x.toString()

export const prop = p => d =>
	d[p]

export const delay = ms => x =>
	new Promise(res => setTimeout(() => res(x), ms))
