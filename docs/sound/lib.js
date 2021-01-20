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

export function cloneCtx(ctx) {
  const canvas = document.createElement("canvas");
  canvas.width = ctx.canvas.width;
  canvas.height = ctx.canvas.height;
  return canvas.getContext("2d");
}

export const withCtx = (fn) => (ctx) => {
  fn(ctx);
};

export const withState = (fn) =>
  withCtx((ctx) => {
    ctx.save();
    fn(ctx);
    ctx.restore();
  });
