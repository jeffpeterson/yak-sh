export const log = (...xs) =>
  console.log(...xs)

export const trace = label => x =>
  (log(`${label}:`, x), x)
