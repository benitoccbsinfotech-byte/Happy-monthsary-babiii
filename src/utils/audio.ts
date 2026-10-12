/**
 * Romantic Music Synthesizer using Web Audio API
 * Plays a tender, soothing acoustic piano / music box romantic progression
 * Runs entirely offline in browser with zero broken external CDN audio links.
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private masterGain: GainNode | null = null;

  // Romantic progression in C major / A minor
  // Notes in Hz: C4, E4, G4, B4, C5, D5, E5, G5, etc.
  private notes = {
    C3: 130.81,
    G3: 196.0,
    A3: 220.0,
    F3: 174.61,
    E3: 164.81,
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.0,
    A4: 440.0,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    G5: 783.99,
  };

  // Tender melody sequence [bass, treble note, duration, delay]
  private sequence: Array<{ bass?: number; treble?: number; delay: number }> = [
    // Phrase 1: C major warmth
    { bass: 130.81, treble: 523.25, delay: 0 },
    { treble: 659.25, delay: 0.5 },
    { treble: 783.99, delay: 1.0 },
    { treble: 659.25, delay: 1.5 },
    { treble: 587.33, delay: 2.0 },
    { treble: 523.25, delay: 2.5 },
    // Phrase 2: A minor tender
    { bass: 220.0, treble: 440.0, delay: 3.0 },
    { treble: 523.25, delay: 3.5 },
    { treble: 659.25, delay: 4.0 },
    { treble: 587.33, delay: 4.5 },
    { treble: 523.25, delay: 5.0 },
    { treble: 493.88, delay: 5.5 },
    // Phrase 3: F major romantic
    { bass: 174.61, treble: 440.0, delay: 6.0 },
    { treble: 523.25, delay: 6.5 },
    { treble: 659.25, delay: 7.0 },
    { treble: 587.33, delay: 7.5 },
    { treble: 523.25, delay: 8.0 },
    { treble: 440.0, delay: 8.5 },
    // Phrase 4: G major resolution with sweetness
    { bass: 196.0, treble: 392.0, delay: 9.0 },
    { treble: 493.88, delay: 9.5 },
    { treble: 587.33, delay: 10.0 },
    { treble: 659.25, delay: 10.5 },
    { treble: 587.33, delay: 11.0 },
    { treble: 493.88, delay: 11.5 },
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.22;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, startTime: number, duration: number, isBass: boolean = false) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm, bell-like sine + subtle triangle for sweet piano/music box chime
    osc.type = isBass ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Envelope: quick gentle attack, mellow decay
    const attack = isBass ? 0.08 : 0.02;
    const decay = duration;
    const volume = isBass ? 0.18 : 0.15;

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + decay);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + decay);
  }

  public start(onStateChange?: (playing: boolean) => void) {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;
    onStateChange?.(true);

    const loopLength = 12.0; // seconds

    const scheduleLoop = (baseTime: number) => {
      if (!this.isPlaying || !this.ctx) return;

      this.sequence.forEach((item) => {
        const itemTime = baseTime + item.delay;
        if (item.bass) {
          this.playTone(item.bass, itemTime, 2.5, true);
        }
        if (item.treble) {
          this.playTone(item.treble, itemTime, 1.2, false);
        }
      });

      const nextLoopTime = baseTime + loopLength;
      const delayMs = (nextLoopTime - this.ctx.currentTime - 0.2) * 1000;

      this.timerId = window.setTimeout(() => {
        if (this.isPlaying && this.ctx) {
          scheduleLoop(nextLoopTime);
        }
      }, Math.max(50, delayMs));
    };

    scheduleLoop(this.ctx.currentTime + 0.05);
  }

  public stop(onStateChange?: (playing: boolean) => void) {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    onStateChange?.(false);
  }

  public toggle(onStateChange?: (playing: boolean) => void): boolean {
    if (this.isPlaying) {
      this.stop(onStateChange);
      return false;
    } else {
      this.start(onStateChange);
      return true;
    }
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
