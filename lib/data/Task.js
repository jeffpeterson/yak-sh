export default class Task {
  constructor(f) {
    this.fork = f
  }

  of(x) {
    return new Task((_, res) => res(x))
  }

  map(f) {
    return new Task((rej, res) => this.fork(rej, x => res(f(x))))
  }

  chain(f) {
    return new Task((rej, res) =>
      this.fork(rej, x => f(x).fork(rej, res)))
  }

  toString() {
    return "Task"
  }

  static fromPromiseFn(f) {
    return new Task((rej, res) => f().then(res, rej))
  }

  static try(f) {
    return new Task((rej, res) => {
      try {
        res(f())
      } catch (e) {
        rej(e)
      }
    })
  }
}
