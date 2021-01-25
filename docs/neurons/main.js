canvas.width = window.innerWidth * 2
canvas.height = window.innerHeight * 2
canvas.style.width = `100vw`
canvas.style.height = `100vh`

let G = 3.674e-12 // 6.674e-11 // Gravitational constant
let M = 1e6 // Solar Mass
let Me = M / 332_946 // Earth mass
let AU = 1 // Astronomical unit

let A1 = Neuron.of({ pos: [-4, -1] })
let A2 = Neuron.of({ pos: [-4, 1] })

let prevCol = []
let curCol = [A1, A2]
for (let x = 0; x < 7; x++) {
  prevCol = curCol
  curCol = []

  for (let y = 1; y < 8; y++) {
    const n = Neuron.of({ pos: [x - 3, y - 4] })
    n.from(...prevCol)
    // n.from(...Neuron.all.sampleOf(1))
    curCol.push(n)
  }
}
// x
let B = Neuron.of({ pos: [4, 0] }).from(...curCol)
// let C1 = Neuron.of({ pos: [0, 10] })
//   .from(B2, ...curCol.sampleOf(3))
//   .to(A2)

// let B1 = Neuron.of({ pos: [0, -2] }).from(A1, A2)
// let B2 = Neuron.of({ pos: [0, -1] }).from(A1, A2)
// let B3 = Neuron.of({ pos: [0, 0] }).from(A1, A2)
// let B4 = Neuron.of({ pos: [0, 1] }).from(A1, A2)
// let B5 = Neuron.of({ pos: [0, 2] }).from(A1, A2)

// let C1 = Neuron.of({ pos: [1, 0] }).from(B1, B2, B3, B4, B5)

setInterval(() => {
  A1.fire()
}, 1000)

setInterval(() => {
  A2.fire()
}, 1200)

var system = {
  debug: false,
  camera: {
    scale: 5,
    shift: [0, 0],
    size: [canvas.width, canvas.height],
    pos: [0, 0],
  },
  neurons: Neuron.all,
}

drawInitial(system)
loop()

function loop() {
  step(system)
  draw(system)

  requestAnimationFrame(loop)
}

function step(sys) {
  for (const neuron of system.neurons) neuron.step(system)
}

function drawInitial(sys) {
  const ctx = canvas.getContext("2d")

  // ctx.fillStyle = "white"
  // ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function draw(sys) {
  const ctx = canvas.getContext("2d")
  const { shift } = sys
  const cam = sys.camera

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.translate(-cam.x.draw, cam.y.draw)

  for (const neuron of sys.neurons) neuron.draw(ctx)
  ctx.restore()
}

function debug() {
  system.debug = true
}

function nodebug() {
  system.debug = false
}

console.log(`
  info will go here
`)

window.onhashchange = processHash
processHash()
function processHash() {
  const hash = location.hash.slice(1)
  if (hash) {
    eval(decodeURIComponent(hash))
  }
}
