canvas.width = window.innerWidth * 2
canvas.height = window.innerHeight * 2
canvas.style.width = `100vw`
canvas.style.height = `100vh`

const M = 1e6
const SCALE = 1000

const hole = {
  color: "black",
  mass: 4.154e6 * M,
  radius: 5,
  vel: [0, 0],
  pos: [0, 0],
  grav: [0, 0],
}

const sun = {
  color: "#E9C86D",
  mass: M,
  radius: 40, // 6.957e8
}.orbit(hole, 1000)

const earth = {
  color: "#6C99C6",
  mass: M / 3.33e5,
  radius: 10, // 6.371e6
}.orbit(sun, 20)

const moon = {
  color: "gray",
  mass: earth.mass / 81,
  radius: 4, // 6.371e6
}.orbit(earth, 0.01)

const asteroid = (n = Math.random(), m = Math.random()) =>
  ({
    color: "#4D4845",
    mass: moon.mass * m * 1e-2,
    radius: 2, // 6.371e6
  }.orbit(hole, n * 100 + 10))

const system = {
  focus: hole,
  objects: [
    // placeholder
    hole,
    sun,
    earth,
    moon,
    // asteroid().orbit(sun, 2),
  ],
}

for (let i = 0; i < 10; i++) {
  system.objects.push(asteroid())
}

loop()
function loop() {
  for (const obj of system.objects) step(obj, system)
  draw(system)
  for (const obj of system.objects) move(obj, system)
  requestAnimationFrame(loop)
}

function step(obj, sys) {
  obj.force = [0, 0]

  for (const oth of sys.objects) {
    if (obj === oth) continue

    obj.force = obj.force.add(obj.gravityFrom(oth))
  }

  obj.vel = obj.vel.add(obj.acceleration)
}

function move(obj, sys) {
  obj.pos = obj.pos.add(obj.vel)
}

function draw(sys) {
  const focus = sys.focus?.pos ?? [0, 0]
  const ctx = canvas.getContext("2d")
  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.translate(-focus.x.draw, focus.y.draw)

  // ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const obj of sys.objects) {
    ctx.fillStyle = obj.color
    ctx.strokeStyle = "#eee"
    ctx.beginPath()
    ctx.arc(obj.pos.x.draw, -obj.pos.y.draw, obj.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    if (obj === sun) {
      drawVec("red", obj, obj.acceleration.scale(50))
      drawVec("blue", obj, obj.vel.scale(5))
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
