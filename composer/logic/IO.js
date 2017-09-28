export const get = url => () =>
  fetch(url).then(d => d.json())
