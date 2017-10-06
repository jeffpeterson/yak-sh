const value = Symbol('Signal value')

export default class Signal {
  constructor(f) {
    this.fork = f
  }

  of(x) {
    return new Signal(trig => trig(x))
  }

  map(f) {
    return new Signal(trig => this.trigger(x => trig(f(x))))
  }

  chain(f) {
    return new Signal(trig =>
      this.trigger(x => f(x).trigger(trig)))
  }

  unsafeOnChange(f) {
    this.trigger = x => (f(x), x)
    return this
  }

  toString() {
    return "Signal"
  }
}
