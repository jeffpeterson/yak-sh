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
    const r = Math.random() * 255
    const g = Math.random() * 255
    const b = Math.max(0, 255 - r - g)

    return {
      color: "red", //`rgb(${})`
      radius: 20,
      pos: [0, 0],

      decay: 0.95,
      base: 0,
      threshold: 1,
      inputs: [],
      outputs: [],
    }
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

    // this.reward()
  }

  reward() {
    const total = this.value
    for (const syn of this.inputs) {
      const amt = syn.value / total
      console.log(amt)
      syn.strength *= 1 + amt
    }
  }

  step(sys) {
    if (this.value >= this.threshold) this.sendAction()
    for (const syn of this.outputs) syn.step(sys)
    this.base *= this.decay
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
      decay: 0.95,
    }
  }

  action() {
    this.value = this.strength
  }

  step() {
    this.value *= this.decay
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = "silver"
    ctx.lineWidth = 2
    ctx.moveTo(this.input.pos.x.draw, -this.input.pos.y.draw)
    ctx.lineTo(this.output.pos.x.draw, -this.output.pos.y.draw)
    ctx.stroke()

    if (this.value > 0) {
      ctx.beginPath()
      ctx.strokeStyle = this.input.color
      ctx.lineWidth = this.value * 20
      ctx.moveTo(this.input.pos.x.draw, -this.input.pos.y.draw)
      ctx.lineTo(this.output.x.draw, -this.output.y.draw)
      ctx.stroke()
    }
  }
}
