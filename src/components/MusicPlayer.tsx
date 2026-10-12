import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Upload, Disc, Radio } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [mode, setMode] = useState<'synth' | 'custom'>('synth');
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [customTrackName, setCustomTrackName] = useState('Romantic Acoustic Melody');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const customAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sync synthesizer volume
  useEffect(() => {
    romanticAudio.setVolume(isMuted ? 0 : volume * 0.35);
    if (customAudioRef.current) {
      customAudioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (mode === 'synth') {
      if (isPlaying) {
        romanticAudio.stop((playing) => setIsPlaying(playing));
      } else {
        romanticAudio.start((playing) => setIsPlaying(playing));
      }
    } else {
      if (!customAudioRef.current) return;
      if (isPlaying) {
        customAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        customAudioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Fallback to synth if custom audio fails
          setMode('synth');
          romanticAudio.start((playing) => setIsPlaying(playing));
        });
      }
    }
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isPlaying) {
        romanticAudio.stop();
        if (customAudioRef.current) customAudioRef.current.pause();
      }
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      setCustomTrackName(file.name.replace(/\.[^/.]+$/, ''));
      setMode('custom');
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Hidden audio element for custom user track */}
      {customAudioUrl && (
        <audio
          ref={customAudioRef}
          src={customAudioUrl}
          loop
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Floating Compact Romantic Music Bar */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg shadow-rose-300/40 border border-rose-200">
          {/* Spinning Disc Indicator */}
          <div
            onClick={togglePlay}
            className={`w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white cursor-pointer shadow-sm ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
            title={isPlaying ? 'Pause music' : 'Play music'}
          >
            <Disc className="w-5 h-5 text-white" />
          </div>

          {/* Track name & Play/Pause */}
          <div className="hidden sm:flex flex-col pr-1">
            <span className="text-[11px] font-semibold text-rose-950 max-w-[130px] truncate leading-tight">
              {isPlaying ? customTrackName : 'Background Music'}
            </span>
            <span className="text-[10px] text-rose-500">
              {isPlaying ? 'Now Playing 🎵' : 'Tap to play music'}
            </span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Toggle Options / Custom Song */}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="w-7 h-7 rounded-full text-rose-400 hover:text-rose-600 flex items-center justify-center cursor-pointer transition-colors"
            title="Music Settings & Custom MP3"
          >
            <Music className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Music Settings Dropdown */}
        {isSettingsOpen && (
          <div className="absolute bottom-14 right-0 w-72 bg-white rounded-2xl p-4 shadow-xl border border-rose-100 text-xs animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-rose-100 mb-3">
              <span className="font-semibold text-rose-950 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-rose-500" />
                Music Controls
              </span>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Volume slider */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-rose-500 cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Mode selection: Built-in Romantic Synth vs Upload MP3 */}
            <div className="space-y-2 pt-2 border-t border-rose-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-[11px]">Track Source:</span>
                <span className="text-rose-600 font-semibold text-[11px]">
                  {mode === 'synth' ? 'Romantic Chimes' : 'Custom Audio'}
                </span>
              </div>

              {/* Upload your own song */}
              <div>
                <label className="block text-[11px] font-semibold text-rose-900 mb-1">
                  Upload Your Own Song (MP3):
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleCustomAudioUpload}
                  className="w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200 cursor-pointer"
                />
              </div>

              {mode === 'custom' && (
                <button
                  onClick={() => {
                    setMode('synth');
                    setCustomTrackName('Romantic Acoustic Melody');
                  }}
                  className="w-full mt-2 py-1 text-center text-[11px] text-rose-500 hover:underline cursor-pointer"
                >
                  Switch back to romantic chimes
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
