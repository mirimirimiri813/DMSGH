import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Maximize2, X, Minus, Home, Image, BookOpen, PenSquare } from 'lucide-react';

export function Minihompy() {
  const [activeTab, setActiveTab] = useState('diary');
  const [guestbookInput, setGuestbookInput] = useState('');
  const [guestbookEntries, setGuestbookEntries] = useState<{id: number, name: string, date: string, content: string}[]>([]);
  const [ilchonInput, setIlchonInput] = useState('');
  const [ilchonList, setIlchonList] = useState<{id: number, content: string, name: string}[]>([]);

  const handleIlchonSubmit = () => {
    if (!ilchonInput.trim()) return;
    setIlchonList([{ id: Date.now(), content: ilchonInput, name: '단짝' }, ...ilchonList]);
    setIlchonInput('');
  };

  const handleGuestbookSubmit = () => {
    if (!guestbookInput.trim()) return;
    
    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setGuestbookEntries([
      {
        id: Date.now(),
        name: "나",
        date: formattedDate,
        content: guestbookInput
      },
      ...guestbookEntries
    ]);
    setGuestbookInput('');
  };

  return (
    <motion.div 
      className="w-[850px] max-w-[95vw] md:max-w-[850px] bg-[#cfd9e8] p-2 sm:p-4 rounded-xl shadow-2xl retro-border relative overflow-hidden font-dotum max-h-[95vh] flex flex-col"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title Bar IE */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-between px-2 text-white retro-border-inset border-blue-400">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 bg-white text-blue-600 flex items-center justify-center font-serif text-[10px] font-bold">e</div>
          <span>은호의 작은 방 - Microsoft Internet Explorer</span>
        </div>
        <div className="flex gap-1">
          <button className="w-5 h-5 bg-blue-600 border border-white/50 flex items-center justify-center text-white hover:bg-blue-500 rounded-sm">
            <Minus size={12} />
          </button>
          <button className="w-5 h-5 bg-blue-600 border border-white/50 flex items-center justify-center text-white hover:bg-blue-500 rounded-sm">
            <Maximize2 size={10} />
          </button>
          <button className="w-5 h-5 bg-red-500 border border-white/50 flex items-center justify-center text-white hover:bg-red-400 rounded-sm">
            <X size={12} />
          </button>
        </div>
      </div>

      <div className="pt-8 flex-1 min-h-0 flex flex-col">
        {/* URL Bar */}
        <div className="hidden md:flex items-center gap-2 mb-4 bg-[#ececec] p-1 border-b border-white/50 shadow-sm text-xs text-gray-700 retro-border-inset border-gray-300">
          <span className="pl-1">주소(D)</span>
          <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-gray-600 flex justify-between">
            <span>http://cyworld.com/eunho_0729</span>
            <span className="cursor-pointer text-blue-600">이동</span>
          </div>
        </div>

        {/* Minihompy Inner wrapper */}
        <div className="flex flex-col md:grid md:grid-cols-[200px_minmax(0,1fr)_40px] gap-2 md:gap-0 md:h-[480px] bg-[#eef1f6] p-2 md:p-4 rounded-lg border border-gray-300 shadow-inner flex-1 min-h-0 overflow-y-auto md:overflow-visible relative">
          
          {/* Mobile Tabs */}
          <div className="flex md:hidden w-full gap-2 mb-1 overflow-x-auto pb-1 scrollbar-hide shrink-0">
            <button onClick={() => setActiveTab('home')} className={`text-xs py-1.5 px-3 border rounded shrink-0 whitespace-nowrap shadow-sm ${activeTab === 'home' ? 'bg-blue-600 text-white font-bold border-blue-700' : 'bg-white text-gray-600 border-gray-300'}`}>홈</button>
            <button onClick={() => setActiveTab('diary')} className={`text-xs py-1.5 px-3 border rounded shrink-0 whitespace-nowrap shadow-sm ${activeTab === 'diary' ? 'bg-blue-600 text-white font-bold border-blue-700' : 'bg-white text-gray-600 border-gray-300'}`}>다이어리</button>
            <button onClick={() => setActiveTab('photo')} className={`text-xs py-1.5 px-3 border rounded shrink-0 whitespace-nowrap shadow-sm ${activeTab === 'photo' ? 'bg-blue-600 text-white font-bold border-blue-700' : 'bg-white text-gray-600 border-gray-300'}`}>사진첩</button>
            <button onClick={() => setActiveTab('guestbook')} className={`text-xs py-1.5 px-3 border rounded shrink-0 whitespace-nowrap shadow-sm ${activeTab === 'guestbook' ? 'bg-blue-600 text-white font-bold border-blue-700' : 'bg-white text-gray-600 border-gray-300'}`}>방명록</button>
          </div>

          {/* Left Column (Profile) */}
          <div className="bg-white border rounded-lg border-gray-300 flex flex-col items-center p-3 relative shrink-0 md:h-full">
            <div className="w-full flex justify-between text-[10px] text-gray-500 font-bold mb-2">
              <span className="text-orange-500">TODAY <span className="text-red-500">0</span></span>
              <span>TOTAL 10,231</span>
            </div>
            
            <div className="w-full max-w-[200px] aspect-[4/5] bg-gray-200 border border-gray-300 mb-4 flex items-center justify-center overflow-hidden">
              {/* Profile Image */}
              <img src="https://drmiri.uk/DMSGH/프로필.webp" alt="프로필" className="w-full h-full object-cover" />
            </div>

            <div className="w-full text-xs text-gray-600 leading-relaxed max-height-[100px] overflow-hidden whitespace-pre-wrap flex-1 text-center border-t border-dashed border-gray-300 pt-3 mb-2">
              {"창밖으로 나가는 상상을 해.\n\n\n\n\n...빨리 퇴원하고 싶다.\n올해엔 나갈 수 있을까?"}
            </div>

            <div className="w-full text-xs border-t border-dashed border-gray-300 pt-2 flex flex-col gap-1">
              <div className="text-blue-600 hover:underline cursor-pointer">▶ H I S T O R Y</div>
              <div className="text-gray-500 mt-2 flex justify-between px-1">
                <span>은호</span> <span>♂ 1993.07.29</span>
              </div>
            </div>

            <div className="w-full mt-auto">
              <select className="w-full text-xs border border-gray-300 py-1 px-2 bg-gray-50" defaultValue="">
                <option value="" disabled>★ 파도타기</option>
                <option value="friend">단짝친구</option>
              </select>
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="bg-white border border-gray-300 rounded-lg md:ml-1 min-h-[400px] md:h-full flex flex-col overflow-hidden relative shrink-0 shadow-sm">
            <div className="w-full border-b border-gray-200 flex flex-col sm:flex-row px-4 justify-between items-start sm:items-end pb-2 pt-2 bg-white z-10">
              <h1 className="font-bold text-blue-900 truncate mb-2 sm:mb-0 max-w-[200px]">은호의 작은 방</h1>
              <div className="flex flex-col items-start sm:items-end overflow-hidden max-w-full">
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-serif truncate hidden md:block w-full text-right shrink-0">http://cyworld.com/eunho_0729</span>
                {/* Background Music player inside header */}
                <div className="flex items-center bg-gray-100 border border-gray-300 rounded px-2 py-[2px] text-[10px] text-gray-600 mt-1 shrink-0 w-full sm:w-auto">
                  <span className="mr-1 text-blue-500">♬</span>
                  <span className="truncate max-w-[150px]">Y (Please Tell Me Why) - Freestyle</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide bg-white relative">
              {activeTab === 'diary' && (
                <div className="space-y-6 pb-10">
                  {/* Diary Entry 1 */}
                  <div className="border border-gray-200 rounded">
                    <div className="bg-gray-100 flex justify-between px-3 py-1 text-xs border-b border-gray-200 text-gray-600">
                      <span className="font-bold">2009.07.29 14:22</span>
                      <span>스크랩 0</span>
                    </div>
                    <div className="p-4 text-xs leading-5 text-gray-800">
                      생일인데도 소독약 냄새만 난다.<br />
                      점심엔 미역국 대신 흰 죽이 나왔다.<br />
                      그래도 간호사 누나가 축하한다고 사탕을 주셨어.<br />
                      엄마는 일 때문에 바쁘시다지만...<br />
                      올해 생일도 병실에서 보냈네. 내년엔 밖에서 보낼 수 있겠지?
                    </div>
                  </div>

                  {/* Diary Entry 2 */}
                  <div className="border border-gray-200 rounded">
                    <div className="bg-gray-100 flex justify-between px-3 py-1 text-xs border-b border-gray-200 text-gray-600">
                      <span className="font-bold">2010.02.14 22:30</span>
                      <span>스크랩 0</span>
                    </div>
                    <div className="p-4 text-xs leading-5 text-gray-800">
                      오늘은 옆 침실 할아버지가 퇴원하셨다.<br />
                      발렌타인데이라는데 단 게 먹고 싶다.<br />
                      초콜릿 대신 링거만 맞고 있어. 팔이 퉁퉁 부었네.<br />
                      창밖엔 눈이 조금 내리더라. 밖은 엄청 춥겠지?
                    </div>
                  </div>

                  {/* Diary Entry 3 */}
                  <div className="border border-gray-200 rounded">
                    <div className="bg-gray-100 flex justify-between px-3 py-1 text-xs border-b border-gray-200 text-gray-600">
                      <span className="font-bold">2011.11.03 01:12</span>
                      <span>스크랩 0</span>
                    </div>
                    <div className="p-4 text-xs leading-5 text-gray-800">
                      창밖이 너무 까맣다.<br />
                      오늘 검사 결과가 별로 안 좋게 나왔어...<br />
                      간호사 누나들도 다 조용하고 병실엔 기계 소리만 들려.<br />
                      잠이 안 와서 계속 메신저만 켜두고 있어. 내일은 좀 나아졌으면 좋겠다.
                    </div>
                  </div>

                  {/* Diary Entry 4 */}
                  <div className="border border-gray-200 rounded">
                    <div className="bg-gray-100 flex justify-between px-3 py-1 text-xs border-b border-gray-200 text-gray-600">
                      <span className="font-bold">2012.04.15 17:40</span>
                      <span>스크랩 0</span>
                    </div>
                    <div className="p-4 text-xs leading-5 text-gray-800">
                      오늘도 멍하니 화면만 계속 바라보다가 지쳐버렸다.<br />
                      창밖으로 벚꽃잎이 날리는데 보러 갈 수가 없네.<br />
                      <br />
                      몸이 점점 더 무거워지는 것 같아...<br />
                      하루하루가 무섭다.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'home' && (
                <div className="h-full flex flex-col pb-6 min-h-0">
                  <div className="mb-4">
                    <h2 className="text-blue-500 text-xs font-bold mb-1 border-b border-dashed border-gray-300 pb-1">Updated news</h2>
                    <ul className="text-xs text-gray-600 space-y-1 mt-2">
                      <li className="flex items-center gap-1"><div className="w-1 h-1 bg-red-400"></div>다이어리 (3)</li>
                      <li className="flex items-center gap-1"><div className="w-1 h-1 bg-blue-400"></div>게시판 (0)</li>
                    </ul>
                  </div>

                  {/* Miniroom Placeholder */}
                  <div className="w-full max-w-[400px] aspect-[4/3] bg-[#f8f8f8] mx-auto border border-gray-300 shadow-sm mt-4 flex items-end justify-center relative">
                    {/* Pixel-like art placeholder */}
                    <div className="absolute w-[80%] h-[40px] bg-[#ddd] bottom-4 left-4 skew-x-[-20deg]"></div>
                    <div className="absolute w-[30px] h-[60px] bg-[#aaa] bottom-4 left-8"></div>
                    <div className="absolute w-full h-[50%] bg-[#eaeaea] top-0 left-0 border-b border-dashed border-gray-300"></div>
                    <div className="z-10 text-[10px] text-gray-400 absolute bottom-2 right-2">
                      Miniroom
                    </div>
                  </div>
                  
                  {/* Ilchonpyeong */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <span className="text-xs font-bold text-blue-500 shrink-0 mt-1">일촌평</span>
                      <input 
                        type="text" 
                        value={ilchonInput}
                        onChange={(e) => setIlchonInput(e.target.value)}
                        placeholder="일촌과 나누는 이야기" 
                        className="flex-1 border border-blue-300 text-xs px-2 py-1 bg-white focus:outline-none focus:border-blue-500 text-gray-800" 
                      />
                      <button 
                        onClick={handleIlchonSubmit}
                        className="text-xs bg-gray-200 hover:bg-gray-300 border border-gray-300 px-3 text-gray-700 font-bold"
                      >
                        확인
                      </button>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {ilchonList.length === 0 ? (
                        <li className="text-[11px] text-gray-400 text-center py-2">등록된 일촌평이 없습니다.</li>
                      ) : (
                        ilchonList.map((item) => (
                          <li key={item.id} className="text-[11px] text-gray-800 break-words">
                            <span className="text-gray-400 mr-2">- </span> {item.content} <span className="text-blue-500 font-bold ml-1">({item.name})</span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'photo' && (
                <div className="h-full flex flex-col space-y-6 pb-10">
                  <div className="border border-gray-200 rounded">
                    <div className="bg-gray-100 flex justify-between px-3 py-1 text-xs border-b border-gray-200 text-gray-600">
                      <span className="font-bold">2010.05.05 13:20</span>
                      <span>어린이날</span>
                    </div>
                    <div className="p-4 flex flex-col items-center border-b border-gray-200">
                      <div className="w-full max-w-[300px] bg-[#eaeaea] border border-gray-300 flex items-center justify-center mb-4 relative overflow-hidden">
                        <img src="https://drmiri.uk/DMSGH/%EC%98%A5%EC%83%81.webp" alt="옥상" className="w-full h-auto object-cover" />
                      </div>
                      <div className="text-xs text-gray-800 text-center w-full">
                        간호사 누나가 병원 옥상으로 데려가 줬다.<br/>
                        하늘이 진짜 파랗다.<br/>
                        다음엔 너랑 같이 밖에 나가서 사진 찍고 싶어.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'guestbook' && (
                <div className="h-full flex flex-col space-y-4 pb-10">
                  <div className="bg-gray-100 p-3 rounded border border-gray-200">
                    <div className="flex gap-2">
                      <div className="w-12 h-12 bg-white border border-gray-300 flex-shrink-0 flex items-center justify-center rounded">
                        <div className="text-[8px] text-gray-400">Miniroom</div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <textarea 
                          value={guestbookInput}
                          onChange={(e) => setGuestbookInput(e.target.value)}
                          placeholder="방명록을 남겨주세요..." 
                          className="w-full text-xs p-2 border border-blue-300 focus:outline-none focus:border-blue-500 resize-none h-16 bg-white text-gray-800"
                        ></textarea>
                        <div className="flex justify-end">
                          <button 
                            onClick={handleGuestbookSubmit}
                            className="bg-gray-200 hover:bg-gray-300 border border-gray-300 text-xs px-3 py-1 rounded text-gray-700 font-bold"
                          >
                            확인
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {guestbookEntries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-xs gap-2">
                      <BookOpen size={32} className="opacity-20" />
                      <span>아직 작성된 방명록이 없습니다.</span>
                      <span>첫 번째 방명록을 남겨보세요!</span>
                    </div>
                  ) : (
                    guestbookEntries.map((entry, index) => (
                      <div key={entry.id} className="bg-gray-100 p-2 text-xs border border-gray-200 flex gap-2">
                        <div className="w-16 h-16 bg-white border border-gray-300 flex-shrink-0 flex items-center justify-center">
                          <div className="text-[10px] text-gray-400">Miniroom</div>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between border-b border-gray-200 pb-1 mb-1">
                            <span className="font-bold text-blue-600">No. {guestbookEntries.length - index}</span>
                            <span className="text-gray-500">{entry.date}</span>
                          </div>
                          <div className="text-gray-800 flex-1 whitespace-pre-wrap">
                            {entry.content}
                          </div>
                          <div className="text-gray-500 text-right mt-1 font-bold">{entry.name}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Tabs - Desktop Only */}
          <div className="hidden md:flex flex-col gap-1 ml-[-1px] pt-12 relative z-0">
            <button 
              onClick={() => setActiveTab('home')}
              className={`text-[11px] py-2 px-1 focus:outline-none border border-gray-400 rounded-r-md border-l-0 transition-colors
                ${activeTab === 'home' ? 'bg-white text-blue-600 z-10 w-[42px] -ml-px' : 'bg-[#2a73cc] text-white hover:bg-blue-600 w-[38px] opacity-80'}`}
              style={{ writingMode: 'vertical-rl', WebkitWritingMode: 'vertical-rl', paddingRight: '12px' }}
            >
              홈
            </button>
            <button 
              onClick={() => setActiveTab('diary')}
              className={`text-[11px] py-2 px-1 focus:outline-none border border-gray-400 rounded-r-md border-l-0 transition-colors
                ${activeTab === 'diary' ? 'bg-white text-blue-600 z-10 w-[42px] -ml-px' : 'bg-[#2a73cc] text-white hover:bg-blue-600 w-[38px] opacity-80'}`}
              style={{ writingMode: 'vertical-rl', WebkitWritingMode: 'vertical-rl', paddingRight: '12px' }}
            >
              다이어리
            </button>
            <button 
              onClick={() => setActiveTab('photo')}
              className={`text-[11px] py-2 px-1 focus:outline-none border border-gray-400 rounded-r-md border-l-0 transition-colors
                ${activeTab === 'photo' ? 'bg-white text-blue-600 z-10 w-[42px] -ml-px' : 'bg-[#2a73cc] text-white hover:bg-blue-600 w-[38px] opacity-80'}`}
              style={{ writingMode: 'vertical-rl', WebkitWritingMode: 'vertical-rl', paddingRight: '12px' }}
            >
              사진첩
            </button>
            <button 
              onClick={() => setActiveTab('guestbook')}
              className={`text-[11px] py-2 px-1 focus:outline-none border border-gray-400 rounded-r-md border-l-0 transition-colors
                ${activeTab === 'guestbook' ? 'bg-white text-blue-600 z-10 w-[42px] -ml-px' : 'bg-[#2a73cc] text-white hover:bg-blue-600 w-[38px] opacity-80'}`}
              style={{ writingMode: 'vertical-rl', WebkitWritingMode: 'vertical-rl', paddingRight: '12px' }}
            >
              방명록
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
