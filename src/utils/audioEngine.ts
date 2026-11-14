/**
 * Web Audio API Procedural Synthesis Engine
 * Zero external files, zero latency, runs on desktop & mobile browsers.
 */

class SoundEngine {
  private ctx: AudioContext | null = null
  private holdOsc: OscillatorNode | null = null
  private holdGain: GainNode | null = null
  public enabled: boolean = true

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
  }

  /** Subtle tactile click for buttons and links */
  tick() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const t = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1400, t)
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.03)
      gain.gain.setValueAtTime(0.04, t)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(t)
      osc.stop(t + 0.03)
    } catch {}
  }

  /** Metallic scanner beep when thumbprint engages */
  startHold() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const t = this.ctx.currentTime
      this.stopHold()

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(90, t)
      osc.frequency.exponentialRampToValueAtTime(480, t + 2.0)

      gain.gain.setValueAtTime(0.01, t)
      gain.gain.linearRampToValueAtTime(0.07, t + 1.8)

      // Add a lowpass filter for deep analog warmth
      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(200, t)
      filter.frequency.exponentialRampToValueAtTime(1800, t + 2.0)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(t)
      this.holdOsc = osc
      this.holdGain = gain
    } catch {}
  }

  /** Stop the hold frequency ramp */
  stopHold() {
    try {
      if (this.holdGain && this.ctx) {
        const t = this.ctx.currentTime
        this.holdGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08)
        setTimeout(() => {
          try {
            this.holdOsc?.stop()
            this.holdOsc?.disconnect()
            this.holdGain?.disconnect()
          } catch {}
          this.holdOsc = null
          this.holdGain = null
        }, 90)
      }
    } catch {}
  }

  /** Cinematic major-9th brass chord chime when deal is sealed */
  dealSealedChime() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const t = this.ctx.currentTime

      // 1. Heavy sub-bass impact
      const sub = this.ctx.createOscillator()
      const subGain = this.ctx.createGain()
      sub.type = 'sine'
      sub.frequency.setValueAtTime(120, t)
      sub.frequency.exponentialRampToValueAtTime(40, t + 0.8)
      subGain.gain.setValueAtTime(0.3, t)
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2)
      sub.connect(subGain)
      subGain.connect(this.ctx.destination)
      sub.start(t)
      sub.stop(t + 1.2)

      // 2. Harmonic chord frequencies (D major 9th: D4, F#4, A4, C#5, E5)
      const freqs = [293.66, 369.99, 440.0, 554.37, 659.25]
      freqs.forEach((freq, idx) => {
        const noteOsc = this.ctx!.createOscillator()
        const noteGain = this.ctx!.createGain()
        noteOsc.type = 'triangle'
        noteOsc.frequency.setValueAtTime(freq, t + idx * 0.04)

        const startT = t + idx * 0.04
        noteGain.gain.setValueAtTime(0.06, startT)
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startT + 2.2)

        noteOsc.connect(noteGain)
        noteGain.connect(this.ctx!.destination)
        noteOsc.start(startT)
        noteOsc.stop(startT + 2.2)
      })
    } catch {}
  }
}

export const soundEngine = new SoundEngine()
