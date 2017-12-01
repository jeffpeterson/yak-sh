export const callN = n => name => {
	switch (n) {
		case 0: return x => x[name]()
		case 1: return y => x => x[name](y)
		case 2: return z => y => x => x[name](y, z)
	}
}

export const call = callN(0)
export const call1 = callN(1)
export const call2 = callN(2)

/// string(5) -> "5"
export const string = call('toString')

/// map(x => x + 1)([5]) -> [6]
export const map = call1('map')

// / chain(x => [x])([5]) -> [5]
export const chain = call1('chain')

/// join(',')(['a', 'b']) -> "a,b"
export const join = call1('join')

/// split(',')('1,2') -> ['1', '2']
export const split = call1('split')

// isNil :: * -> Boolean
export const isNil = x =>
	x == null

/// always(1)() -> 1
export const always = x =>
	() => x

export const tap = f => x =>
	(f(x), x)

export const _compose = (f, g) => x =>
	f(g(x))

// composes a list of functions
export const compose = (...fs) =>
	fs.reduce(_compose)

// like compose, but in reversed order
export const pipe = (...fs) =>
  compose(...fs.reverse())

/// is(Number)(1) -> true
export const is = t => x =>
	x != null && x.constructor === t || x instanceof t

/// negative(1) -> -1
export const negative = x =>
	-x

/// multiply(5)(4) -> 20
export const multiply = x => y =>
	y * x

/// divide(4)(20) -> 5
export const divide = x => y =>
	y / x

/// add(1)(2) -> 3
export const add = x => y =>
	y + x

export const subtract = compose(add, negative)
/// inc(1) -> 2
export const inc = add(1)
export const dec = subtract(1)

/// int("010") -> 10
export const int = x =>
	parseInt(x, 10)

/// float("01.0") -> 1.0
export const float = x =>
	parseFloat(x)

/// prop('a')({a: 1}) -> 1
export const prop = p => d =>
	d[p]

export const delay = ms => x =>
	new Task((rej, res) => setTimeout(() => res(x), ms))
