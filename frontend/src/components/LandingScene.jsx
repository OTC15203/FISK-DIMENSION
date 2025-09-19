import React, { Suspense, useEffect, useState } from 'react';
import AvatarScene from './AvatarScene.jsx';
import VoiceButton from './VoiceButton.jsx';

export default function LandingScene() {
  const [showAvatar, setShowAvatar] = useState(false);
  const [statusText, setStatusText] = useState('Calibrating entry portal…');

  useEffect(() => {
    const revealTimer = setTimeout(() => setShowAvatar(true), 2200);
    const statusTimer = setTimeout(() => setStatusText('Interactive neural link ready.'), 4200);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(statusTimer);
    };
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-black via-[#0b0318] to-[#021a1f] text-white">
      <div className="absolute inset-0 bg-dimension-grid opacity-30" aria-hidden="true" />
      <div className="aurora absolute -top-52 left-10 h-[420px] w-[420px] rounded-full" aria-hidden="true" />
      <div className="aurora absolute -bottom-52 right-0 h-[520px] w-[520px] rounded-full" aria-hidden="true" />

      <header className="relative z-20 flex items-center justify-between px-10 py-6">
        <div>
          <p className="font-pixel text-[10px] uppercase tracking-[0.45em] text-neon-cyan">Omega9 Control Deck</p>
          <h1 className="mt-2 font-techno text-3xl font-semibold text-neon-lime drop-shadow-[0_0_15px_rgba(50,255,156,0.35)]">
            Fisk Dimension Nexus
          </h1>
        </div>
        <div className="rounded-full border border-neon-violet/40 px-6 py-2 text-sm font-techno text-slate-200">
          {statusText}
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 px-6">
        <div className="relative flex w-full max-w-5xl flex-1 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/45 shadow-[0_40px_120px_rgba(3,17,28,0.65)] backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-violet/10 via-transparent to-neon-lime/10" aria-hidden="true" />
          <Suspense fallback={<span className="font-techno text-sm text-slate-400">Loading holo-avatar…</span>}>
            {showAvatar ? <AvatarScene /> : <div className="font-techno text-sm text-slate-300">Synthesizing 3D pixel anime avatar…</div>}
          </Suspense>
        </div>
        <div className="relative flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl font-techno text-base text-slate-200">
            Engage with the <span className="text-neon-violet">interactive communication lattice</span>. Voice, motion, and vision protocols render in real time once you cross the threshold.
          </p>
          <button
            type="button"
            onClick={() => alert('Entering the Fisk Dimension mainframe…')}
            className="cyber-button rounded-full px-8 py-3 font-techno text-sm uppercase tracking-[0.35em] text-white"
          >
            Enter the Dimension
          </button>
        </div>
      </main>

      <VoiceButton />
    </div>
  );
}
