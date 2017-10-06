export const node = name => attrs => content =>
  ({name, attrs, content})

export const div = node('div')
export const span = node('span')

/// p({x: 'y'})('hi') -> {name: 'p', attrs: {x: 'y'}, content: 'hi'}
export const p = node('p')
