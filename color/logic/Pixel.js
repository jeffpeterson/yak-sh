const mapN = n => f => xs => {
  const l = xs.length
  const T = xs.constructor
  const ys = new T(l)
  for (let i = 0; i < l; i += n) {
    ys.set(f(xs.subarray(i, i + n)), i)
  }
  return ys
}

export const mapPixels = mapN(4)
