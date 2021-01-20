const unimplemented = () => { throw new Error('Not implemented.') }
let _nothing
const value = Symbol('Just value')

export default class Maybe {
  static Just(x) {
    return new Just(x)
  }

  static Nothing() {
    return _nothing
  }

  static of(x) {
    return new Just(x)
  }

  static fromNullable(x) {
    return x == null
      ? _nothing
      : new Just(x)
  }

  static fromEither(x) {
    return x.fold(Maybe.Nothing, Maybe.Just)
  }
}

Maybe.prototype.ap = unimplemented
Maybe.prototype.chain = unimplemented
Maybe.prototype.isEqual = unimplemented
Maybe.prototype.map = unimplemented
Maybe.prototype.toString = unimplemented
Maybe.prototype.of = Maybe.of
Maybe.prototype.fromEither = Maybe.fromEither
Maybe.prototype.fromNullable = Maybe.fromNullable
Maybe.prototype.isNothing = false
Maybe.prototype.isJust = false

export class Nothing extends Maybe {
  constructor() {}

  get() {
    throw new TypeError("Can't extract the value of a Nothing.")
  }

  getOrElse(x) {
    return x
  }

  orElse(f) {
    return f()
  }

  isEqual(x) {
    return x.isNothing
  }

  map(_) {
    return this
  }

  chain(_) {
    return this
  }

  ap(_) {
    return this
  }

  toString() {
    return 'Maybe.Nothing'
  }
}

Nothing.prototype.isNothing = true
_nothing = new Nothing()

export class Just extends Maybe {
  constructor(x) {
    this[value] = x
  }

  get() {
    return this[value]
  }

  getOrElse(_) {
    return this[value]
  }

  orElse(_) {
    return this
  }

  isEqual(x) {
    return x.isJust && x[value] === this[value]
  }

  chain(f) {
    return f(this[value])
  }

  map(f) {
    return new Just(f(this[value]))
  }

  toString() {
    return `Maybe.Just(${this.value})`
  }

  ap(x) {
    x.map(this[value])
  }
}

Just.prototype.isJust = true
