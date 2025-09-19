import React from 'react';

export default function VoiceButton() {
  const handleMic = () => {
    alert('Voice command detected: Fisk Awaken');
  };

  return (
    <div className="pointer-events-auto absolute right-10 top-8 z-30 flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleMic}
        className="cyber-button flex items-center gap-2 rounded-full px-5 py-2 font-techno text-xs uppercase tracking-[0.25em] text-white"
      >
        <span role="img" aria-hidden="true">
          🎤
        </span>
        Activate Voice Link
      </button>
      <span className="font-pixel text-[9px] uppercase tracking-[0.35em] text-neon-cyan">
        Live Vision &amp; Motion Sync Ready
      </span>
    </div>
  );
}
