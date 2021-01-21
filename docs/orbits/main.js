canvas.width = window.innerWidth * 2
canvas.height = window.innerHeight * 2
canvas.style.width = `100vw`
canvas.style.height = `100vh`

let G = 6.674e-9 //-11
let M = 1e6

var hole = {
  color: "black",
  mass: 4.154e5 * M,
  radius: 50,
  vel: [0, 0],
  pos: [0, 0],
  grav: [0, 0],
}

var sun = {
  color: "#E9C86D",
  mass: M,
  radius: 40, // 6.957e8
}.orbit(hole, 1_000_0)

var earth = {
  color: "#6C99C6",
  mass: M / 3.33e6,
  radius: 10, // 6.371e6
}.orbit(sun, 8)

var mercury = {
  color: "#A4583A",
  mass: M * 3.33e-8,
  radius: 4, // 6.371e6
}.orbit(sun, 1, Math.random())

var venus = {
  color: "#E7AF68",
  mass: M * 3.33e-8,
  radius: 7, // 6.371e6
}.orbit(sun, 5, Math.random())

var mars = {
  color: "#A4583A",
  mass: M * 3.33e-5,
  radius: 8, // 6.371e6
}.orbit(sun, 11, Math.random())

var moon = {
  color: "gray",
  mass: earth.mass / 81,
  radius: 4, // 6.371e6
}.orbit(earth, 0.01)

var asteroids = []
var asteroid = (body, n = Math.random(), m = Math.random()) =>
  ({
    color: "#4D4845",
    mass: moon.mass * m * 1e-2,
    radius: 2, // 6.371e6
  }
    .orbit(body, n * 10 + 0.1, Math.random())
    .tap(a => {
      asteroids.push(a)
      system.bodies.push(a)
    }))

var system = {
  debug: false,
  camera: {
    focus: earth,
    scale: 9,
    shift: [0, 0],
    size: [canvas.width, canvas.height],
    pos: [0, 0],
  },
  bodies: [
    // placeholder
    hole,
    sun,
    mercury,
    venus,
    mars,
    earth,
    moon,
  ],
}

for (let i = 0; i < 50; i++) {
  asteroid(sun)
}

loop()
function loop() {
  for (const obj of system.bodies) step(obj, system)
  draw(system)
  for (const obj of system.bodies) move(obj, system)
  requestAnimationFrame(loop)
}

function step(obj, sys) {
  obj.force = [0, 0]

  for (const oth of sys.bodies) {
    if (obj === oth) continue

    obj.force = obj.force.add(obj.gravityFrom(oth))
  }

  obj.vel = obj.vel.add(obj.acceleration)
}

function move(obj, sys) {
  obj.pos = obj.pos.add(obj.vel)
}

function draw(sys) {
  const ctx = canvas.getContext("2d")
  const { shift } = sys
  const cam = sys.camera
  const focus = cam.focus.pos
  ctx.fillStyle = "rgba(255, 255, 255, 0.01)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if (sys.wipe || sys.wipeOnce) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    sys.wipeOnce = false
  }

  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.translate(-focus.x.draw, focus.y.draw)
  // ctx.translate(shift.x.draw / 10, shift.y)

  for (const obj of sys.bodies) {
    ctx.fillStyle = obj.color
    ctx.strokeStyle = "#eee"
    ctx.beginPath()
    ctx.arc(obj.pos.x.draw, -obj.pos.y.draw, obj.radius, 0, 2 * Math.PI)
    ctx.fill()
    // ctx.stroke()

    if (sys.debug) {
      drawVec("red", obj, obj.acceleration.scale(cam.scale))
      drawVec(
        "blue",
        obj,
        obj.vel
          .add(sys.debugAbsolute ? [0, 0] : cam.focus.vel.neg)
          .scale(cam.scale / 2),
      )
    }
  }

  ctx.restore()

  function drawVec(color, obj, v) {
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(obj.pos.x.draw, -obj.pos.y.draw)
    const g = obj.pos.add(v)
    ctx.lineTo(g.x.draw, -g.y.draw)
    ctx.stroke()
  }
}

/**
 * Change the "speed" of the animation: speed(1.5) moves 50% faster.
 */
function speed(n) {
  G *= n

  for (const obj of system.bodies) {
    obj.vel = obj.vel.scale(n.sqrt)
  }

  return G
}

function toggleDebug(p = !system.debug) {
  system.debug = p
}

function debug(absolute = false) {
  system.debugAbsolute = absolute
  system.debug = true
}

function wipe(p = true) {
  system.wipeOnce = p
}

function wipeAll(p = true) {
  system.wipe = p
}

function focus(body) {
  system.camera.focus = body
  wipe()
}

function zoom(n) {
  system.camera.scale /= n
  wipe()
}

function scale(n) {
  system.camera.scale = n
  wipe()
}

console.log(`
go(sun) // focus and zoom to another body
speed(2) // change the speed (kinda)
focus(hole) // focus on another body
zoom(0.001) // zoom in or out
`)

function go(body) {
  focus(body)

  switch (body) {
    case earth:
      scale(9)
      break

    case mars:
    case sun:
      scale(10)
      break

    case hole:
      scale(10_000)
      break
  }
}

window.onhashchange = processHash
processHash()
function processHash() {
  const hash = location.hash.slice(1)
  if (hash) {
    eval(decodeURIComponent(hash))
  }
}
