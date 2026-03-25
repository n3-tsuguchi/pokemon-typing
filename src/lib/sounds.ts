let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Short rising chime for correct answer */
export function playCorrectSE() {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.linearRampToValueAtTime(1320, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch {}
}

/** Descending tone for time up */
export function playTimeUpSE() {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    // Three descending notes
    const notes = [660, 550, 440];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      const start = now + i * 0.18;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

      osc.start(start);
      osc.stop(start + 0.25);
    });
  } catch {}
}

/** Short beep for countdown */
export function playCountdownSE(isGo: boolean = false) {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(isGo ? 880 : 600, now);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isGo ? 0.3 : 0.15));

    osc.start(now);
    osc.stop(now + (isGo ? 0.3 : 0.15));
  } catch {}
}
