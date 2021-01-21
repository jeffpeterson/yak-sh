extend(Object, {
  tap(f) {
    f(this)
    return this
  },

  get x() {
    return this.pos.x
  },

  get y() {
    return this.pos.y
  },

  get acceleration() {
    return this.force.scale(1 / this.mass)
  },

  gravityFrom(b) {
    const m = this.mass * b.mass
    const r = this.distTo(b)
    const g = (G * m) / r.sq

    return b.diff(this).unit.scale(g)
  },

  diff(b) {
    return this.pos.diff(b.pos)
  },

  distTo(b) {
    return this.pos.distTo(b.pos)
  },

  relTo(b) {
    this.pos = this.pos.add(b.pos)
    this.vel = this.vel.add(b.vel)
    return this
  },

  orbit(b, r = this.x, n = 1) {
    this.pos = b.pos.add([r, 0])

    const g = ((G * (this.mass + b.mass)) / r).sqrt
    const vel = [0, 1].scale(g * (n * 0.5 + 0.5))
    this.vel = b.vel.add(vel)
    return this
  },
})

extend(Array, {
  get x() {
    return this[0]
  },

  get y() {
    return this[1]
  },

  get neg() {
    return this.map(x => -x)
  },

  get len() {
    return (this.x.sq + this.y.sq).sqrt
  },

  get unit() {
    return this.scale(1 / this.len)
  },

  scale(n) {
    return this.map(x => x * n)
  },

  add(b) {
    return this.map((x, i) => x + b[i])
  },

  distTo(b) {
    return this.diff(b).len
  },

  diff(b) {
    return this.add(b.neg)
  },

  get canvas() {
    return this.add(system.focus.pos)
  },
})

extend(Number, {
  get sq() {
    return Math.pow(this, 2)
  },

  get sqrt() {
    return Math.sqrt(this)
  },

  get draw() {
    const max = Math.min(canvas.height, canvas.width) / 2
    const f = max / system.camera.scale
    return this * f
  },
})

function extend(Class, defs) {
  const descs = Object.getOwnPropertyDescriptors(defs)
  Object.defineProperties(Class.prototype, descs)
  return Class
}
