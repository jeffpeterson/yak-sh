
/// ybr([248, 228, 184]) -> [228.964, 102.62527999999999, 141.57772799999998]
export const ybr = ([r,g,b,a]) =>
// YCbCr better maps to human color perception
// see http://en.wikipedia.org/wiki/YCbCr

[ (0.299 * r) + (0.587 * g) + (0.114 * b),
  128 - (0.168736 * r) - (0.331264 * g) + (0.5 * b),
  128 + (0.5 * r) - (0.418688 * g) - (0.081312 * b),
  a,
]

export const showR = ([r,g,b,a]) => [r,r,r,a]
export const showG = ([r,g,b,a]) => [g,g,g,a]
export const showB = ([r,g,b,a]) => [b,b,b,a]

export const hiR = ([r,g,b,a]) => [r,255-r,255-r,a]
export const hiG = ([r,g,b,a]) => [255-g,g,255-g,a]
export const hiB = ([r,g,b,a]) => [255-b,255-b,b,a]
