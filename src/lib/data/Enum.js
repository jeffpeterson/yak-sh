import Lazy from './Lazy.js'

export default class Enum {
  constructor(f) {
    this._f = () => struc
  }

  static of(v) {
    new Enum(() => v)
  }

  map(f) {
    this._f = () => this._map(f)
  }

  _map(f) {

  }
}
