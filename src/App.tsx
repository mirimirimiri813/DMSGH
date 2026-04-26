import React, { useState, useEffect } from 'react';
import { Desktop } from './components/Desktop';

export default function App() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden font-dotum">
      <Desktop />
    </div>
  );
}
