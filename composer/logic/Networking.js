import Task from '../data/Task.js'
import {call} from './FP.js'

export const request = ({method, url, headers, mode, cache}) =>
  Task.fromPromiseFn(() =>
    fetch(url, {method, headers, mode, cache}))

export const json = call('json')

export const get = url =>
  request({url, method: 'GET'})

