export const wrap = (pre, post) => content =>
pre + '\n' + content.toString().split('\n').map(x => '  ' + x).join('\n') + '\n' + post


export const _render = v =>
  isNil(v) ? ''
  : is(String)(v) ? v
  : v.map ? v.map(_render).join('')
  : `<${v.name}${attrs(v.attrs)}>${_render(v.content)}</${v.name}>`

export const render = mnt => tree =>
  null
