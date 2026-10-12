import React, { useState } from 'react';
import { Heart, Sparkles, Mail, Music2 } from 'lucide-react';

interface WelcomeScreenProps {
  onOpen: () => void;
  onStartMusicPrompt?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpen, onStartMusicPrompt }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    if (onStartMusicPrompt) {
      onStartMusicPrompt();
    }
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background:
          'radial-gradient(circle at 50% 30%, #FFE4E8 0%, #FFF0F3 45%, #FDE2E8 100%)',
      }}
    >
      {/* Decorative dreamy background glows */}
      <div className="absolute top-12 left-12 h-64 w-64 rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-12 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl pointer-events-none" />

      {/* Main Love Card Envelope */}
      <div className="relative w-full max-w-lg mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl shadow-rose-200/60 border border-rose-100/80 text-center">
        {/* Cute top stamp */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-medium tracking-wide mb-6 border border-rose-100">
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>Special Delivery for My Favorite Person</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        </div>

        {/* Animated Heart Centerpiece */}
        <div className="relative mx-auto my-4 w-28 h-28 flex items-center justify-center">
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full bg-rose-200/50 animate-ping opacity-60" />
          <div className="absolute inset-2 rounded-full bg-rose-100/80 animate-gentle-pulse" />
          
          {/* Main 3D Glowing Heart */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center shadow-lg shadow-rose-400/40 cursor-pointer transform hover:scale-110 active:scale-95 transition-transform duration-300">
            <Heart className="w-10 h-10 text-white fill-white animate-gentle-pulse" />
          </div>

          {/* Floating tiny floating heart badges */}
          <span className="absolute -top-1 -right-1 text-lg animate-bounce">💖</span>
          <span className="absolute -bottom-2 -left-1 text-sm animate-pulse">🌸</span>
        </div>

        {/* Title & Date */}
        <h1 className="mt-6 text-3xl sm:text-4xl font-serif-display font-bold text-rose-950 tracking-tight leading-snug">
          Happy Monthsary, Babi! 💗
        </h1>

        <div className="mt-3 flex items-center justify-center gap-2 text-rose-600 font-medium text-sm sm:text-base">
          <span className="h-px w-6 bg-rose-300" />
          <span className="tracking-wider uppercase text-xs font-semibold">October 13, 2026</span>
          <span className="h-px w-6 bg-rose-300" />
        </div>

        <p className="mt-4 text-rose-800/80 text-sm sm:text-base font-handwriting text-xl sm:text-2xl leading-relaxed">
          &ldquo;Ikaw pa rin ang pinipili ko araw-araw. A little love corner built just for you.&rdquo;
        </p>

        {/* Action Button: Open My Heart */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-semibold rounded-2xl shadow-lg shadow-rose-400/35 hover:shadow-xl hover:shadow-rose-500/40 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer text-base"
          >
            <Mail className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-6" />
            <span>Open My Heart 💌</span>
          </button>

          <span className="text-xs text-rose-400 font-sans-clean">
            Click to unlock your surprises, memories &amp; letter
          </span>
        </div>
      </div>
    </div>
  );
};
