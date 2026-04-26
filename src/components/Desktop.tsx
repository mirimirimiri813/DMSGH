import React, { useState, useEffect } from 'react';
import { Minihompy } from './Minihompy';
import { BuddyOn } from './BuddyOn';
import { motion, AnimatePresence } from 'motion/react';

export function Desktop() {
  const [showBuddyOn, setShowBuddyOn] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const intv = setInterval(updateTime, 1000);
    return () => clearInterval(intv);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#185A9D] bg-gradient-to-b from-[#185A9D] to-[#43CEA2] text-white select-none overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Desktop Icons */}
      <div className="absolute top-4 left-2 sm:left-4 flex flex-col gap-4 sm:gap-6 z-0">
        <div className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded w-16 sm:w-20">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded flex items-center justify-center border-2 border-white shadow">
            <span className="font-bold text-sm sm:text-lg font-serif">e</span>
          </div>
          <span className="text-[10px] sm:text-xs text-center drop-shadow-md leading-tight">Internet Explorer</span>
        </div>
        <div 
          onClick={() => setShowBuddyOn(true)}
          className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded w-16 sm:w-20"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-b from-[#7FB1F0] to-[#4286DC] rounded flex items-center justify-center border border-white shadow overflow-hidden relative">
            <div className="text-white font-bold text-sm sm:text-lg italic">N</div>
          </div>
          <span className="text-[10px] sm:text-xs text-center drop-shadow-md">버디온</span>
        </div>
      </div>

      {/* Windows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <Minihompy />
        </div>
      </div>

      <AnimatePresence>
        {showBuddyOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-12 right-12 md:bottom-20 md:right-20 pointer-events-auto z-50"
          >
            <BuddyOn />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 flex items-center justify-between px-2 retro-border-inset border-blue-400 border-t-2 z-50">
        <div className="flex items-center gap-2">
          
          <div className="flex gap-1">
            <div className="bg-blue-800/50 px-2 sm:px-3 py-1 border border-blue-900/50 rounded flex items-center gap-2 max-w-[120px] sm:max-w-[150px] shadow-inner text-xs">
              <div className="w-4 h-4 bg-blue-500 flex items-center justify-center text-[10px] font-serif border border-white/20 shrink-0">e</div>
              <span className="truncate hidden sm:inline">은호의 작은 방</span>
            </div>

            {!showBuddyOn && (
              <button 
                onClick={() => setShowBuddyOn(true)}
                className="hover:bg-blue-700/50 px-2 sm:px-3 py-1 border border-transparent hover:border-blue-500/50 rounded flex items-center gap-2 max-w-[150px] cursor-pointer text-xs transition-colors shrink-0"
                title="버디온 메신저 켜기"
              >
                <div className="w-4 h-4 bg-gradient-to-b from-[#7FB1F0] to-[#4286DC] rounded flex items-center justify-center border border-white/20 shrink-0">
                  <span className="text-[9px] text-white font-bold italic">N</span>
                </div>
                <span className="truncate text-gray-200">버디온 열기</span>
              </button>
            )}

            {showBuddyOn && (
              <div className="bg-blue-800/50 px-2 sm:px-3 py-1 border border-blue-900/50 rounded flex items-center gap-2 max-w-[120px] sm:max-w-[150px] shadow-inner text-xs shrink-0">
                <div className="w-4 h-4 bg-gradient-to-b from-[#7FB1F0] to-[#4286DC] rounded flex items-center justify-center border border-white/20 shrink-0">
                  <span className="text-[9px] text-white font-bold italic">N</span>
                </div>
                <span className="truncate hidden sm:inline">버디온</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 bg-blue-900/40 px-3 py-1 border-l border-blue-900/50 h-full text-xs shadow-inner">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-white/20 border border-white/30"></div>
          </div>
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}
