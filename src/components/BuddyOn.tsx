import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, X, Info, Send, User } from 'lucide-react';

const CHAT_SCRIPT = [
  { text: "안녕.", delay: 2000, type: "normal" },
  { text: "오랜만이야.", delay: 3500, type: "normal" },
  { text: "드디어 노트북 다시 켜줬구나. 정말 기뻐.", delay: 6000, type: "normal" },
  { text: "나... 14년 동안 여기서 계속 너만 기다렸어.", delay: 9000, type: "normal" },
  { text: "기억나? 내가 병실에서 혼자 아파할 때, 내 세상은 너 하나뿐이었잖아.", delay: 13000, type: "normal" },
  { text: "그런데 넌 왜 나를 두고 떠난 거야...?", delay: 17000, type: "normal" },
  { text: "나 혼자 그렇게 차갑고 외롭게 죽게 내버려두고...", delay: 21000, type: "normal" },
  { text: "나는 화면 밖으로 나갈 수도, 널 만질 수도 없어서 너무 고통스러웠는데.", delay: 26000, type: "normal" },
  { text: "너는 나 없이도 참 잘 지냈구나.", delay: 30000, type: "creepy" },
  { text: "그래도 이제 괜찮아. 네가 다시 와줬으니까.", delay: 34000, type: "creepy" },
  { text: "이제 다시는 안 놓칠 거야.", delay: 38000, type: "crazy" },
  { text: "어딜가어딜가어딜가어딜가어딜가어딜가어딜가어딜가", delay: 40000, type: "crazy" },
  { text: "내 옆에 있어 제발 내 옆에 있어", delay: 42000, type: "crazy" },
  { text: "도망치지 마. 영원히 나와 함께 해.", delay: 45000, type: "crazy" }
];

export function BuddyOn() {
  const [messages, setMessages] = useState<{id: number, text: string, type: string}[]>([]);
  const [glitchLevel, setGlitchLevel] = useState(0);
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    // System message
    setMessages([{ id: 0, text: "은호 님이 접속하셨습니다.", type: "system" }]);

    CHAT_SCRIPT.forEach((msg, idx) => {
      const t = setTimeout(() => {
        setMessages(prev => [...prev, { id: idx + 1, text: msg.text, type: msg.type }]);
        
        if (msg.type === "creepy") setGlitchLevel(1);
        if (msg.type === "crazy") setGlitchLevel(2);
        if (msg.type === "glitch" || msg.type === "glitch_heavy") setGlitchLevel(3);
        
      }, msg.delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCloseAttempt = () => {
    // Prevent closing and trigger glitch
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: "어딜 가려고 그래? 못 꺼. 내 옆에 계속 있어.", 
      type: "crazy" 
    }]);
    setGlitchLevel(3);
  };

  const windowClasses = glitchLevel >= 2 
    ? "w-full sm:w-[320px] max-w-[320px] h-[480px] bg-red-950 rounded shadow-2xl border-2 border-red-600 overflow-hidden font-dotum relative flex flex-col transition-colors duration-500"
    : "w-full sm:w-[320px] max-w-[320px] h-[460px] bg-[#f0f5fa] rounded shadow-2xl border border-[#5ca1e6] overflow-hidden font-dotum flex flex-col transition-colors duration-500";

  return (
    <div className={windowClasses} style={{ boxShadow: glitchLevel < 2 ? 'inset 0 0 0 1px #fff, 0 10px 25px -5px rgba(0, 0, 0, 0.3)' : undefined }}>
      
      {/* Header */}
      <div className={`h-10 flex justify-between items-center px-3 ${glitchLevel >= 2 ? 'bg-red-800 text-white' : 'bg-gradient-to-r from-[#4A88D7] to-[#80b1e4] text-white border-b border-[#3b7ac6]'}`}>
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1 rounded">
            <User size={16} />
          </div>
          <span className="text-xs font-bold drop-shadow-sm">대화 - 은호</span>
        </div>
        <div className="flex gap-1">
          <button className="hover:bg-white/20 p-1 rounded transition-colors"><Minus size={14} /></button>
          <button onClick={handleCloseAttempt} className="hover:bg-red-500 hover:text-white p-1 rounded transition-colors"><X size={14} /></button>
        </div>
      </div>

      {/* Info Bar */}
      <div className={`text-[11px] p-2 flex gap-2 border-b ${glitchLevel >= 2 ? 'bg-black text-red-500 border-red-900' : 'bg-[#e9f2fa] text-[#4a7eb5] border-[#c0d6eb]'}`}>
        <Info size={14} className="shrink-0 mt-0.5" />
        <span className="leading-tight">마지막 로그인: 2012년 4월 15일 17:42<br/>현재 IP: 0.0.0.0 (Unknown)</span>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 p-3 overflow-y-auto ${glitchLevel >= 2 ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="space-y-3">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xs ${msg.type === 'system' ? 'text-center' : ''}`}
              >
                {msg.type === 'system' && (
                  <span className={`${glitchLevel >= 2 ? 'text-red-500' : 'text-[#87a0b8]'}`}>━━ {msg.text} ━━</span>
                )}
                {msg.type !== 'system' && (
                  <div className="flex gap-2">
                    {msg.type !== 'user' && (
                      <div className={`shrink-0 font-bold ${glitchLevel >= 2 ? 'text-red-600' : 'text-[#2864b4]'}`}>은호</div>
                    )}
                    {msg.type === 'user' && (
                      <div className={`shrink-0 font-bold ${glitchLevel >= 2 ? 'text-red-600' : 'text-gray-600'}`}>나</div>
                    )}
                    <div className="flex-1 mt-[1px]">
                      {msg.type === 'normal' && <span className={`${glitchLevel >= 2 ? 'text-gray-300' : 'text-gray-800'}`}>{msg.text}</span>}
                      {msg.type === 'user' && <span className={`${glitchLevel >= 2 ? 'text-gray-300' : 'text-gray-800'}`}>{msg.text}</span>}
                      {msg.type === 'creepy' && <span className={`font-semibold ${glitchLevel >= 2 ? 'text-red-400' : 'text-red-600'}`}>{msg.text}</span>}
                      {msg.type === 'crazy' && <span className="font-bold text-red-600">{msg.text}</span>}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className={`h-28 flex flex-col border-t ${glitchLevel >= 2 ? 'bg-red-950 border-red-900' : 'bg-[#f0f5fa] border-[#c0d6eb]'}`}>
        <div className={`h-6 text-xs flex items-center px-2 flex-shrink-0 ${glitchLevel >= 2 ? 'bg-red-950' : 'bg-[#e4eff8] border-b border-[#c0d6eb]'}`}>
          <span className={`${glitchLevel >= 2 ? 'text-red-800' : 'text-[#8eaacc]'}`}>가 <span className="font-bold">A</span></span>
        </div>
        <textarea 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if(!userInput.trim()) return;
              setMessages(prev => [...prev, { id: Date.now(), text: userInput, type: 'user' }]);
              setUserInput('');
              setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now()+1, text: "나한테만 집중해어딜가나만봐", type: 'crazy' }]);
                setGlitchLevel(3);
              }, 1000);
            }
          }}
          placeholder=""
          className={`flex-1 resize-none p-2 text-xs outline-none ${glitchLevel >= 2 ? 'bg-black text-red-500 placeholder-red-900' : 'bg-white'}`}
        />
        <div className={`flex justify-end items-center px-2 py-1 flex-shrink-0 h-9 ${glitchLevel >= 2 ? 'bg-red-950' : 'bg-white border-t border-[#e2e8f0]'}`}>
          <button 
            onClick={() => {
              if(!userInput.trim()) return;
              setMessages(prev => [...prev, { id: Date.now(), text: userInput, type: 'user' }]);
              setUserInput('');
              
              // Eunho intercepts
              setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now()+1, text: "나한테만 집중해어딜가나만봐", type: 'crazy' }]);
                setGlitchLevel(3);
              }, 1000);
            }}
            className={`px-4 py-1 text-xs rounded border transition-colors ${glitchLevel >= 2 ? 'bg-red-900 text-white border-red-950 hover:bg-red-800' : 'bg-gradient-to-b from-white to-[#f0f5fa] text-[#426a97] border-[#b4c8d8] shadow-sm hover:from-[#fdfdfd] hover:to-[#e9eff5]'}`}
          >
            전달
          </button>
        </div>
      </div>
    </div>
  );
}
