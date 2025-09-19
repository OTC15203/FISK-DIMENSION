import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'fisk_dimension_access';

export default function SecureGate({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      setAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (!authorized) {
      const interval = setInterval(() => setPulse((prev) => !prev), 1200);
      return () => clearInterval(interval);
    }
  }, [authorized]);

  if (!authorized) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-dimension-grid opacity-40" aria-hidden="true" />
        <div className="aurora absolute -top-32 left-1/4 h-96 w-96 rounded-full" aria-hidden="true" />
        <div className="aurora absolute -bottom-24 right-1/3 h-96 w-96 rounded-full" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center gap-6 rounded-3xl border border-neon-cyan/30 bg-black/70 px-12 py-14 text-center shadow-lg backdrop-blur-2xl glow-border">
          <span className="font-pixel text-xs uppercase tracking-[0.35em] text-neon-cyan">
            FISK DIMENSION ACCESS NODE
          </span>
          <p className="max-w-md font-techno text-sm text-slate-200">
            Authenticate to stabilize the <span className="text-neon-lime">Omega9 channel</span>. The gate renders an anime-realistic control nexus with interactive vision and voice protocols once engaged.
          </p>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem(STORAGE_KEY, 'granted');
              setAuthorized(true);
            }}
            className={`cyber-button rounded-full px-10 py-4 font-techno text-sm uppercase tracking-[0.4em] text-white transition-all duration-300 ${
              pulse ? 'animate-pulse-slow' : ''
            }`}
          >
            Enter Private Fisk Dimension
          </button>
          <p className="font-pixel text-[10px] uppercase text-slate-400">
            voice command phrase: <span className="text-neon-violet">"Fisk Awaken"</span>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
