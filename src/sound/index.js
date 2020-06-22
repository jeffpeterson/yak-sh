import { run, cloneCtx, withState } from "./lib.js";

const binCount = 1024;
const buffer = new Uint8Array(binCount);
const height = binCount;
const width = window.innerWidth;

output.width = width;
output.height = height;

const outputCtx = output.getContext("2d");
const bufferCtx = cloneCtx(outputCtx);

save.onclick = (e) => {
  // e.preventDefault();
  save.href = output.toDataURL("image/png");
};

nav.appendChild(save);

run({
  async start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audio = new AudioContext();
    const source = audio.createMediaStreamSource(stream);
    const analyser = audio.createAnalyser();

    analyser.smoothingTimeConstant = 0;
    analyser.ffsSize = 1024;
    source.connect(analyser);

    return { frame: 0, ctx: outputCtx, analyser };
  },

  draw({ frame, ctx, analyser }) {
    analyser.getByteFrequencyData(buffer);

    ctx.clearRect(0, 0, width, height);
    drawSpectrogram(bufferCtx);
    ctx.drawImage(bufferCtx.canvas, 0, 0);
    // drawLive(ctx);

    return { frame: frame + 1 };
  },
});

const drawSpectrogram = (ctx) => {
  ctx.drawImage(ctx.canvas, -1, 0);

  withState((ctx) => {
    ctx.translate(width - 1, 0);
    drawBuffer(ctx);
  })(ctx);
};

const drawBuffer = (ctx) => {
  let max = { v: 0, y: 0 };

  for (let y = 0; y < buffer.length; y++) {
    const v = buffer[y];
    const c = 255 - v;

    if (v > max.v) max = { v, y };

    ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
    ctx.fillRect(0, y, 1, 1);
  }
};

const drawLive = (ctx) => {
  for (let y = 0; y < buffer.length; y++) {
    const v = buffer[y] / 3;

    ctx.fillStyle = "red";
    ctx.fillRect(width - v, y, v, 1);
  }
};
