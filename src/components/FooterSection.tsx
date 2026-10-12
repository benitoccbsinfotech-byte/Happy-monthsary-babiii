import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [loveTaps, setLoveTaps] = useState<number>(() => {
    return parseInt(localStorage.getItem('babi_love_taps') || '520', 10);
  });
  const [justTapped, setJustTapped] = useState(false);

  const handleTapHeart = () => {
    const next = loveTaps + 1;
    setLoveTaps(next);
    localStorage.setItem('babi_love_taps', next.toString());
    setJustTapped(true);
    setTimeout(() => setJustTapped(false), 500);
  };

  return (
    <footer id="final-message" className="relative mt-20 pb-24 pt-16 px-4 bg-gradient-to-b from-transparent via-rose-100/40 to-rose-200/50 border-t border-rose-200/60 text-center overflow-hidden">
      {/* Decorative floating heart shapes */}
      <div className="max-w-3xl mx-auto">
        {/* Animated Main Glowing Heart */}
        <div className="relative inline-flex items-center justify-center my-4">
          <div
            onClick={handleTapHeart}
            className={`w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-xl shadow-rose-400/50 cursor-pointer transform hover:scale-110 active:scale-90 transition-transform ${
              justTapped ? 'scale-125 ring-8 ring-rose-200' : 'animate-gentle-pulse'
            }`}
            title="Tap to send a love heart to babi!"
          >
            <Heart className="w-10 h-10 fill-white text-white" />
          </div>

          {justTapped && (
            <span className="absolute -top-6 text-sm font-bold text-rose-600 animate-bounce">
              +1 Love 💕
            </span>
          )}
        </div>

        {/* Taps counter */}
        <p className="text-xs text-rose-500 font-medium mb-6">
          {loveTaps} love taps sent to Babi (tap the heart!)
        </p>

        {/* Mandatory Final Message from Prompt */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-rose-100 shadow-lg shadow-rose-200/40 max-w-2xl mx-auto">
          <p className="font-serif-display text-xl sm:text-2xl font-bold text-rose-950 leading-relaxed">
            &ldquo;No matter how many months or year pa ang lumipas, ikaw pa rin, babi. I will always choose you. Happy Monthsary, my babiii! 💗&rdquo;
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-rose-600 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>October 13, 2026 • Forever &amp; Always</span>
            <Sparkles className="w-4 h-4 text-rose-400" />
          </div>
        </div>

        {/* "Made with love, just for you" */}
        <div className="mt-8 text-xs text-rose-700/80 font-medium flex items-center justify-center gap-2">
          <span>Made with love, just for you</span>
          <span>•</span>
          <span>Forever your babi</span>
        </div>
      </div>
    </footer>
  );
};

