import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { FloatingHearts } from './components/FloatingHearts';
import { CountdownTimer } from './components/CountdownTimer';
import { LoveLetter } from './components/LoveLetter';
import { MusicPlayer } from './components/MusicPlayer';
import { FooterSection } from './components/FooterSection';
import { romanticAudio } from './utils/audio';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function App() {
  const [hasOpenedWelcome, setHasOpenedWelcome] = useState<boolean>(() => {
    // Default show welcome screen on fresh visit
    return false;
  });

  const handleOpenWelcome = () => {
    setHasOpenedWelcome(true);
    // Smoothly start soothing melody when envelope opens
    if (!romanticAudio.getIsPlaying()) {
      romanticAudio.start();
    }
  };

  const handleReopenWelcome = () => {
    setHasOpenedWelcome(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#4A282E] relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      {/* Floating Canvas Particles */}
      <FloatingHearts />

      {/* 1. Welcome Screen (Overlay) */}
      {!hasOpenedWelcome && (
        <WelcomeScreen onOpen={handleOpenWelcome} />
      )}

      {/* Top Navigation Bar adhering to Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#FFF5F7]/85 backdrop-blur-md border-b border-rose-200/60 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="#"
            className="text-lg sm:text-xl font-serif-display font-bold text-rose-950 whitespace-nowrap shrink-0 flex items-center gap-2 hover:text-rose-700 transition-colors"
          >
            <span>My Babi</span>
            <span className="text-rose-500 animate-gentle-pulse">💗</span>
          </a>

          {/* Zone 2: Concise single-line text nav links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-rose-800/80">
            <a
              href="#countdown"
              className="hover:text-rose-950 transition-colors whitespace-nowrap shrink-0"
            >
              Countdown
            </a>
            <a
              href="#love-letter"
              className="hover:text-rose-950 transition-colors whitespace-nowrap shrink-0"
            >
              Love Letter
            </a>
            <a
              href="#final-message"
              className="hover:text-rose-950 transition-colors whitespace-nowrap shrink-0"
            >
              Our Forever
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReopenWelcome}
              className="px-3.5 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900 bg-rose-100/70 hover:bg-rose-200/70 rounded-full transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              title="Show welcome envelope again"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Welcome Card</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Website Content */}
      <main className="relative z-10 space-y-4 sm:space-y-8">
        {/* Hero Banner Header */}
        <div className="pt-8 sm:pt-14 pb-2 text-center px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/70 text-rose-700 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>October 13, 2026 • Our Special Date</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-display font-bold text-rose-950 tracking-tight leading-tight">
            Happy Monthsary, Babi! 💗
          </h1>

          <p className="mt-3 text-rose-800/80 font-handwriting text-2xl sm:text-3xl max-w-xl mx-auto leading-relaxed">
            &ldquo;Salamat sa bawat tawa, bawat kwento, at sa pagmamahal mo araw-araw.&rdquo;
          </p>
        </div>

        {/* 1. Monthsary Countdown */}
        <CountdownTimer />

        {/* 2. Love Letter */}
        <LoveLetter />

        {/* 3. Final Message & Footer */}
        <FooterSection />
      </main>

      {/* Background Music Player Controller */}
      <MusicPlayer />
    </div>
  );
}

