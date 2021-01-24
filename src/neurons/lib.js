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

  /** Standard gravitational parameter */
  get mu() {
    return this.mass * G
  },

  get acceleration() {
    return this.force.scale(1 / this.mass)
  },

  gravityFrom(b) {
    const r = this.distTo(b)
    const g = (b.mu * this.mass) / r.sq

    return b.sub(this).unit.scale(g)
  },

  sub(b) {
    return this.pos.sub(b.pos)
  },

  distTo(b) {
    return this.pos.distTo(b.pos)
  },

  orbit(b, r = this.x, n = 1) {
    this.pos = b.pos.add([r, 0])

    const g = (b.mu / r).sqrt
    const vel = [0, 1].scale(g * (n * 0.85 + 0.15))
    this.vel = b.vel.add(vel)
    return this
  },
})

extend(Array, {
  each(k) {
    return this.map(x => x[k])
  },

  get x() {
    return this[0]
  },

  get y() {
    return this[1]
  },

  get sum() {
    return this.reduce((a, b) => a + b, 0)
  },

  get shuffle() {
    return [...this].sort(() => Math.random() - 0.5)
  },

  get sample() {
    return this[Math.floor(Math.random() * this.length)]
  },

  sampleOf(n) {
    return this.shuffle.slice(0, n)
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
    return this.sub(b).len
  },

  sub(b) {
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
