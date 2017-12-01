import Task from '../data/Task.js'

export const find = x => () =>
  new Task((_, res) => res(document.querySelector(x)))

export const all = x => () =>
  new Task((_, res) => res(document.querySelectorAll(x)))
