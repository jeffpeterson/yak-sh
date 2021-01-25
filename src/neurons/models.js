let DECAY = 0.9

class Base {
  static of(...props) {
    return new this(...props)
  }

  static get defaults() {
    return {}
  }

  constructor(...props) {
    this.self.all ??= []
    this.self.all.push(this)
    Object.assign(this, this.self.defaults, ...props)
    this.setup()
  }

  get self() {
    return this.constructor
  }

  setup() {}

  step() {}

  draw(ctx) {}
}

class Neuron extends Base {
  static get defaults() {
    const r = Math.random()
    const g = Math.random()
    const b = Math.max(0, 1 - r - g)

    return {
      color: [r, g, b].color,
      radius: 20,
      pos: [0, 0],

      base: 0,
      inputs: [],
      outputs: [],
    }
  }

  setup() {
    const { x, y } = this.pos
    this.self.index ??= []
    this.self.index[x] ??= []
    this.self.index[x][y] = this
  }

  get input() {
    return this.inputs.each("value").sum
  }

  get value() {
    return this.base + this.input
  }

  to(...outputs) {
    for (const output of outputs) {
      for (const existing of this.outputs) {
        if (existing.output === output) continue
      }

      const syn = new Synapse({ input: this, output })
      this.outputs.push(syn)
      output.inputs.push(syn)
    }

    return this
  }

  from(...inputs) {
    for (const input of inputs) input.to(this)
    return this
  }

  fire() {
    this.base = 1
  }

  sendAction() {
    for (const syn of this.outputs) syn.action()
    // setTimeout(() => syn.action(), syn.length.sqrt * 10)
    this.reward()
  }

  reward() {
    const total = this.value

    for (const syn of this.inputs) {
      // const amt = syn.value / total
      // console.log(amt)
      // syn.strength *= amt
      if (syn.value < 0.01) syn.strength *= 0.1
    }
  }

  step(sys) {
    if (this.value >= 1) this.sendAction()
    for (const syn of this.outputs) syn.step(sys)
    this.base *= DECAY
  }

  draw(ctx) {
    for (const syn of this.outputs) syn.draw(ctx)

    ctx.beginPath()

    ctx.fillStyle = "silver"
    ctx.arc(this.pos.x.draw, -this.pos.y.draw, this.radius, 0, 2 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.value
    ctx.arc(this.pos.x.draw, -this.pos.y.draw, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.globalAlpha = 1
  }
}

class Synapse extends Base {
  static get defaults() {
    return {
      input: null,
      output: null,

      strength: Math.random(),
      value: 0,
    }
  }

  get length() {
    return this.input.pos.distTo(this.output.pos)
  }

  action() {
    setTimeout(() => this._action(), (this.length * 100) / this.strength)
  }

  _action() {
    this.strength = [this.strength + 0.1, 1].min
    this.value = this.strength
  }

  step() {
    this.value *= DECAY * this.strength
    if (this.value < 0.001) this.value = 0
  }

  draw(ctx) {
    if (this.strength === 0) return

    ctx.beginPath()
    ctx.strokeStyle = "silver"
    ctx.lineWidth = this.strength * 10
    ctx.moveTo(this.input.pos.x.draw, -this.input.pos.y.draw)
    ctx.lineTo(this.output.pos.x.draw, -this.output.pos.y.draw)
    ctx.stroke()

    if (this.value > 0) {
      ctx.beginPath()
      ctx.strokeStyle = this.input.color
      ctx.lineWidth = this.value * 10
      ctx.moveTo(this.input.pos.x.draw, -this.input.pos.y.draw)
      ctx.lineTo(this.output.x.draw, -this.output.y.draw)
      ctx.stroke()
    }
  }
}
