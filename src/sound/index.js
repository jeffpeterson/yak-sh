import { run } from "./lib.js";

run({
  async start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const ctx = new AudioContext();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();

    analyser.smoothingTimeConstant = 0;
    analyser.ffsSize = 512;

    const height = analyser.frequencyBinCount;

    const buffer = new Uint8Array(height);

    source.connect(analyser);
    const width = window.innerWidth;
    canvas.width = width;
    canvas.height = height;

    return { frame: 0, analyser, buffer, width, height };
  },
  draw({ frame, analyser, buffer, width, height }) {
    analyser.getByteFrequencyData(buffer);

    const ctx = canvas.getContext("2d");
    const x = frame % width;

    let max = { v: 0, y: 0 };

    for (let y = 0; y < buffer.length; y++) {
      const v = buffer[y];
      const c = 255 - v;
      if (v > max.v) max = { v, y };
      ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // if (max.v > 0) {
    //   ctx.fillStyle = `rgb(${max.v}, 0, 0)`;
    //   ctx.fillRect(x, max.y, 1, 1);
    // }

    return { frame: frame + 1 };
  },
});
