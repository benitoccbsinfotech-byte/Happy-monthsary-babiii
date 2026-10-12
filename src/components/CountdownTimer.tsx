import React, { useState, useEffect } from 'react';
import { Clock, Heart, Sparkles, PartyPopper } from 'lucide-react';

/**
 * =========================================================================
 * ⏳ SPECIAL DATE CONFIGURATION
 * Target Date: October 13, 2026 (10/13/2026 00:00:00)
 * =========================================================================
 */
const TARGET_DATE_STRING = '2026-10-13T00:00:00';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isReached: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [forceCelebration, setForceCelebration] = useState<boolean>(false);

  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(TARGET_DATE_STRING).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0 || forceCelebration) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isReached: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isReached: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [forceCelebration]);

  return (
    <section id="countdown" className="relative py-12 sm:py-20 px-4 max-w-4xl mx-auto">
      {/* Container */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-12 shadow-xl shadow-rose-200/50 border border-rose-100/90 text-center overflow-hidden">
        {/* Soft background radial aura */}
        <div className="absolute inset-0 bg-radial-gradient from-rose-100/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-rose-500 font-medium text-xs sm:text-sm tracking-wider uppercase mb-2">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>Counting Every Second</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-rose-950">
            {timeLeft.isReached ? 'Our Monthsary Today' : 'Countdown to October 13, 2026 ⏳'}
          </h2>

          <p className="mt-2 text-rose-800/80 text-sm sm:text-base max-w-md mx-auto">
            {timeLeft.isReached
              ? 'Today is October 13, 2026! A celebration of our love, memories, and forever.'
              : 'Every single second brings us closer to celebrating another milestone together.'}
          </p>

          {/* If the date arrived: CELEBRATION MODE */}
          {timeLeft.isReached ? (
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white shadow-xl shadow-rose-400/30 animate-gentle-pulse">
              <div className="flex items-center justify-center gap-3 text-3xl sm:text-4xl mb-3">
                <PartyPopper className="w-8 h-8" />
                <span className="font-serif-display font-bold">HAPPY MONTHSARY, BABI!</span>
                <Heart className="w-8 h-8 fill-white" />
              </div>
              <p className="font-handwriting text-2xl sm:text-3xl tracking-wide max-w-lg mx-auto">
                &ldquo;October 13, 2026 is officially here! Thank you for loving me, babi. Here&apos;s to a lifetime of us.&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-rose-100">
                <Sparkles className="w-4 h-4" />
                <span>Sobrang mahal na mahal kita palagi</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          ) : (
            /* LIVE COUNTDOWN DIGITS */
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {/* Days */}
              <div className="p-4 sm:p-6 rounded-2xl bg-rose-50/80 border border-rose-100/90 shadow-sm">
                <div className="font-mono text-3xl sm:text-5xl font-bold text-rose-900 tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider text-rose-500 font-semibold mt-1">
                  Days
                </div>
              </div>

              {/* Hours */}
              <div className="p-4 sm:p-6 rounded-2xl bg-rose-50/80 border border-rose-100/90 shadow-sm">
                <div className="font-mono text-3xl sm:text-5xl font-bold text-rose-900 tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider text-rose-500 font-semibold mt-1">
                  Hours
                </div>
              </div>

              {/* Minutes */}
              <div className="p-4 sm:p-6 rounded-2xl bg-rose-50/80 border border-rose-100/90 shadow-sm">
                <div className="font-mono text-3xl sm:text-5xl font-bold text-rose-900 tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider text-rose-500 font-semibold mt-1">
                  Minutes
                </div>
              </div>

              {/* Seconds */}
              <div className="p-4 sm:p-6 rounded-2xl bg-rose-50/80 border border-rose-100/90 shadow-sm">
                <div className="font-mono text-3xl sm:text-5xl font-bold text-rose-600 tabular-nums animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider text-rose-500 font-semibold mt-1">
                  Seconds
                </div>
              </div>
            </div>
          )}

          {/* Toggle to preview celebration mode */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setForceCelebration(!forceCelebration)}
              className="text-xs text-rose-400 hover:text-rose-600 underline cursor-pointer transition-colors"
            >
              {forceCelebration
                ? 'Back to live countdown'
                : 'Preview October 13 celebration message 🎉'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
