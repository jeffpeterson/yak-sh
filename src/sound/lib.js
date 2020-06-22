export async function run({ start, draw }) {
  eachFrame(await start(), draw)();
}

export function eachFrame(v, fn) {
  const onFrame = async () => {
    const v2 = await fn(v);
    if (v2 !== null) {
      Object.assign(v, v2);
      requestAnimationFrame(onFrame);
    }
  };

  return onFrame;
}
