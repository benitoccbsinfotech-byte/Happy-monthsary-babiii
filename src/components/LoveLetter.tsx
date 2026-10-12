import React, { useState, useEffect } from 'react';
import { Heart, Edit3, RotateCcw, Check, Sparkles, Feather } from 'lucide-react';

/**
 * =========================================================================
 * 💌 LOVE LETTER CONFIGURATION & DEFAULT MESSAGE
 * To customize the default text directly in the code, simply modify below:
 * =========================================================================
 */
const DEFAULT_RECIPIENT = 'My Babi';

const DEFAULT_PARAGRAPHS = [
  'Hi my favorite person, happy monthsary sa ating dalawa! 💗',
  'Writing this while thinking about every little thing that makes you so special to me. Sobrang thankful ako kay Lord at sa universe na ikaw yung dumating sa buhay ko. Hindi ko maipaliwanag kung gaano kalaki yung saya at kapayapaan na dinadala mo sa puso ko araw-araw.',
  'Thank you for your unending patience, your cute smiles, your random jokes na palaging nagpapatawa sa akin, and especially your warmest hugs na nagiging safe place ko whenever things get tiring or overwhelming. With you, everything feels easier and warmer.',
  'Alam ko hindi palagi madali ang lahat, pero through all the ups and downs, ikaw pa rin palagi, babi. Hindi magbabago yun. I will always choose you, support your dreams, and hold your hand through everything.',
  'Sobrang thankful ako na nandiyan ka. Mahal na mahal kita higit pa sa kayang sabihin ng mga salita. Happy Monthsary, my babiii! 🌸✨',
];

export const LoveLetter: React.FC = () => {
  const [recipient, setRecipient] = useState<string>(() => {
    return localStorage.getItem('babi_letter_recipient') || DEFAULT_RECIPIENT;
  });

  const [letterContent, setLetterContent] = useState<string>(() => {
    return localStorage.getItem('babi_letter_content') || DEFAULT_PARAGRAPHS.join('\n\n');
  });

  // Typing animation state
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [tempRecipient, setTempRecipient] = useState<string>(recipient);
  const [tempContent, setTempContent] = useState<string>(letterContent);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);

    const fullText = letterContent;
    let currentIndex = 0;
    const speed = 18; // ms per character

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [letterContent]);

  const handleSkipTyping = () => {
    setDisplayedText(letterContent);
    setIsTyping(false);
  };

  const handleReplayTyping = () => {
    setDisplayedText('');
    setIsTyping(true);
    let currentIndex = 0;
    const speed = 16;
    const timer = setInterval(() => {
      if (currentIndex < letterContent.length) {
        setDisplayedText(letterContent.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);
  };

  const handleSaveEdit = () => {
    setRecipient(tempRecipient);
    setLetterContent(tempContent);
    localStorage.setItem('babi_letter_recipient', tempRecipient);
    localStorage.setItem('babi_letter_content', tempContent);
    setIsEditModalOpen(false);
  };

  const handleResetToDefault = () => {
    setTempRecipient(DEFAULT_RECIPIENT);
    setTempContent(DEFAULT_PARAGRAPHS.join('\n\n'));
  };

  return (
    <section id="love-letter" className="relative py-12 sm:py-20 px-4 max-w-4xl mx-auto">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-10 text-rose-200/50 select-none pointer-events-none">
        <Heart className="w-32 h-32 fill-current rotate-12 blur-[1px]" />
      </div>

      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-rose-500 font-medium text-xs sm:text-sm tracking-wider uppercase mb-2">
          <Feather className="w-4 h-4 text-rose-400" />
          <span>Straight from my heart</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-rose-950">
          A Letter for You, Babi 💌
        </h2>
        <p className="mt-2 text-rose-800/70 text-sm sm:text-base">
          Read slowly with your heart. Every single word is for you.
        </p>
      </div>

      {/* Parchment Love Letter Card */}
      <div className="relative bg-[#FFFDFC] rounded-3xl p-6 sm:p-12 shadow-xl shadow-rose-200/50 border border-rose-100/90 overflow-hidden">
        {/* Soft top-right wax seal badge */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 shadow-md shadow-rose-700/30 flex items-center justify-center transform rotate-6 border-2 border-rose-200">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
        </div>

        {/* Letter Heading / Salutation */}
        <div className="mb-6 border-b border-rose-100 pb-4">
          <span className="text-xs uppercase tracking-widest text-rose-400 font-semibold block mb-1">
            To the love of my life:
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-rose-900 flex items-center gap-2">
            Dearest {recipient},
            <span className="text-rose-500 animate-pulse text-xl">💗</span>
          </h3>
        </div>

        {/* Letter Body with Typing Animation */}
        <div className="min-h-[260px] text-slate-800 font-handwriting text-2xl sm:text-3xl leading-relaxed whitespace-pre-line tracking-wide">
          {displayedText}
          {isTyping && (
            <span className="inline-block w-1.5 h-6 bg-rose-500 ml-1 animate-pulse align-middle" />
          )}
        </div>

        {/* Closing signature */}
        <div className="mt-8 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-handwriting text-2xl text-rose-600">Palaging nagmamahal,</p>
            <p className="font-serif-display font-semibold text-lg text-rose-950">Your Babi 🤍</p>
          </div>

          {/* Letter controls: Skip, Replay, Edit */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {isTyping ? (
              <button
                onClick={handleSkipTyping}
                className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Show full letter</span>
              </button>
            ) : (
              <button
                onClick={handleReplayTyping}
                className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay typing</span>
              </button>
            )}

            <button
              onClick={() => {
                setTempRecipient(recipient);
                setTempContent(letterContent);
                setIsEditModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg border border-rose-200 hover:border-rose-300 bg-white hover:bg-rose-50/50 text-rose-700 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit message ✏️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal (allowing the user to personalize the message anytime) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-serif-display font-bold text-rose-950 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-rose-500" />
                Personalize Your Love Letter
              </h4>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-rose-700/80 mb-4">
              You can customize your message anytime! It will immediately update and save on your browser.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-900 uppercase tracking-wider mb-1">
                  Recipient Name / Pet Name:
                </label>
                <input
                  type="text"
                  value={tempRecipient}
                  onChange={(e) => setTempRecipient(e.target.value)}
                  placeholder="e.g. My Babi, Mahal ko, My Beb"
                  className="w-full px-3.5 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-900 uppercase tracking-wider mb-1">
                  Your Heartfelt Message:
                </label>
                <textarea
                  rows={7}
                  value={tempContent}
                  onChange={(e) => setTempContent(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 text-sm leading-relaxed"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-rose-100">
              <button
                onClick={handleResetToDefault}
                className="text-xs text-rose-500 hover:text-rose-700 underline cursor-pointer"
              >
                Reset to default letter
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-400/30 transition-all cursor-pointer"
                >
                  Save Letter 💕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
