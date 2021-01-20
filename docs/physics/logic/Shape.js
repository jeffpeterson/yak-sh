export const point = (x, y, z) =>
  ([x, y, z])

export const line = (p1, p2) =>
  ({ type: "line", p1, p2, })
