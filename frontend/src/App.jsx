import React from 'react';
import SecureGate from './components/SecureGate.jsx';
import LandingScene from './components/LandingScene.jsx';

export default function App() {
  return (
    <SecureGate>
      <LandingScene />
    </SecureGate>
  );
}
