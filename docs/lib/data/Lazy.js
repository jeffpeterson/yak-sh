const value = Symbol('Lazy value')

export default class Lazy {
  constructor(f) {
    this._f = f
  }

  value() {
    return this[value]
      ? this[value]
      : (this[value] = this._f())
  }

  static of(v) {
    new Lazy(() => v)
  }
}
