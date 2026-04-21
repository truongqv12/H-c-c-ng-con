import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { sessionActivities } from '../data/mockActivities';
import { ActivityContext } from '../types';
import { Button } from '../components/ui/button';
import { Volume2, Star, CheckCircle, ArrowRight, CornerUpLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ChildSession() {
  const { sessionActivitiesCompleted, incrementSessionActivities, resetSession, setCurrentView, updateProgress } = useStore();
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'success' | 'retry' | null>(null);
  
  // States for specific templates
  const [touchedItems, setTouchedItems] = useState<string[]>([]);
  const [spellSlots, setSpellSlots] = useState<string[]>([]);

  const activity = sessionActivities[currentActivityIndex];
  
  useEffect(() => {
    // Reset local state when activity changes
    setTouchedItems([]);
    setSpellSlots([]);
    setShowFeedback(null);
    
    // Simulate playing audio instruction
    if (activity) {
      console.log('Playing audio:', activity.instruction);
    }
  }, [currentActivityIndex, activity]);

  if (!activity) {
    // End of session!
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="text-center bg-white p-12 rounded-[3rem] shadow-xl border-4 border-green-100"
        >
          <div className="text-9xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>🏆</div>
          <h1 className="text-4xl font-black text-green-700 mb-4">Hoan hô bé!</h1>
          <p className="text-xl text-green-600 mb-8 font-medium">Bé đã hoàn thành bài học hôm nay!</p>
          
          <div className="bg-yellow-50 rounded-3xl p-6 mb-8 border-2 border-yellow-200">
             <div className="text-5xl mb-2">⭐</div>
             <div className="text-yellow-700 font-bold text-xl">+1 Ngôi Sao</div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="rounded-full shadow-lg bg-green-500 hover:bg-green-600"
              onClick={() => {
                resetSession();
                setCurrentView('home');
              }}
            >
              Về nhà
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full shadow-sm border-2 border-slate-200"
              onClick={() => {
                resetSession();
                setCurrentView('rewards');
              }}
            >
              Xem phần thưởng
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleCorrect = () => {
    setShowFeedback('success');
    updateProgress(activity.skill, true);
    setTimeout(() => {
      incrementSessionActivities();
      if (currentActivityIndex === sessionActivities.length - 1) {
        // Last activity complete, give star
        useStore.getState().addStar(1);
      }
      setCurrentActivityIndex(prev => prev + 1);
      setShowFeedback(null);
    }, 2000);
  };

  const handleIncorrect = () => {
    setShowFeedback('retry');
    updateProgress(activity.skill, false);
    
    // Automatically reset spell slots if they got it wrong so they can try again.
    if (activity.template === 'spell_word') {
       setTimeout(() => setSpellSlots([]), 1000);
    }

    setTimeout(() => {
      setShowFeedback(null);
    }, 1500);
  };

  // --- TEMPLATE RENDERING ---
  const renderListenSelect = () => {
    return (
      <div className="flex justify-center gap-8 mt-12 w-full max-w-4xl px-4">
        {activity.stimulus.options.map((opt: any) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={opt.id}
            onClick={() => opt.isCorrect ? handleCorrect() : handleIncorrect()}
            className="flex-1 max-w-xs aspect-square bg-white rounded-3xl border-4 border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4 hover:border-blue-200"
          >
            <div className="text-8xl">{opt.image}</div>
            <div className="text-6xl font-black text-slate-800">{opt.text}</div>
          </motion.button>
        ))}
      </div>
    );
  };

  const renderCountTouch = () => {
    return (
      <div className="mt-12 flex flex-col items-center w-full max-w-4xl px-4">
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {activity.stimulus.items.map((item: any) => {
            const isTouched = touchedItems.includes(item.id);
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                animate={{ opacity: isTouched ? 0.5 : 1, y: isTouched ? -10 : 0 }}
                disabled={showFeedback === 'success'}
                onClick={() => {
                  if (isTouched) return;
                  const newTouched = [...touchedItems, item.id];
                  setTouchedItems(newTouched);
                  
                  // Simulate counting out loud
                  console.log(`Đếm: ${newTouched.length}`);
                  
                  if (newTouched.length === activity.stimulus.targetCount) {
                    setTimeout(() => handleCorrect(), 500);
                  }
                }}
                className="w-32 h-32 bg-white rounded-3xl shadow-sm flex items-center justify-center text-7xl border-4 border-slate-100"
              >
                {item.icon}
                {isTouched && (
                  <div className="absolute font-black text-blue-600 bg-white/80 rounded-full w-12 h-12 flex items-center justify-center right-0 top-0 shadow-sm">
                    {touchedItems.indexOf(item.id) + 1}
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
        <div className="text-2xl font-bold text-slate-500">
           Bé đã chạm vào: <span className="text-blue-600 text-4xl ml-2">{touchedItems.length}</span>
        </div>
      </div>
    );
  };

  const renderShapeMatch = () => {
    return (
      <div className="mt-12 flex flex-col items-center w-full">
         <div className="flex justify-center items-center gap-4 mb-16 bg-white p-8 rounded-3xl shadow-sm">
            {activity.stimulus.pattern.map((shape: string, i: number) => (
              <div key={i} className={`w-24 h-24 flex items-center justify-center text-7xl ${shape === '?' ? 'border-4 border-dashed border-slate-300 rounded-3xl bg-slate-50 text-slate-300' : ''}`}>
                 {shape}
              </div>
            ))}
         </div>

         <div className="flex gap-6">
           {activity.stimulus.options.map((shape: string, i: number) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-28 h-28 bg-white border-2 border-slate-200 rounded-2xl shadow-sm text-6xl flex items-center justify-center"
                onClick={() => shape === activity.stimulus.targetShape ? handleCorrect() : handleIncorrect()}
              >
                {shape}
              </motion.button>
           ))}
         </div>
      </div>
    );
  };

  const renderSpellWord = () => {
    const { targetSpelling, options } = activity.stimulus;
    const isFull = spellSlots.length === targetSpelling.length;

    const handleOptionClick = (char: string) => {
      if (isFull) return;
      const newSlots = [...spellSlots, char];
      setSpellSlots(newSlots);
      
      // Auto-check if slots are filled
      if (newSlots.length === targetSpelling.length) {
         const isMatch = newSlots.join('') === targetSpelling.join('');
         if (isMatch) {
            handleCorrect();
         } else {
            handleIncorrect();
         }
      }
    };

    const handleSlotRemove = (index: number) => {
      const newSlots = [...spellSlots];
      newSlots.splice(index, 1);
      setSpellSlots(newSlots);
    };

    return (
      <div className="mt-12 flex flex-col items-center w-full max-w-4xl px-4">
        {/* Drop zones */}
        <div className="flex gap-4 mb-12">
          {targetSpelling.map((_: any, idx: number) => (
            <motion.button 
              key={idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSlotRemove(idx)}
              className={`w-32 h-32 rounded-3xl flex items-center justify-center text-7xl font-bold transition-colors ${
                spellSlots[idx] 
                  ? 'bg-blue-100 border-4 border-blue-300 text-blue-700 shadow-sm' 
                  : 'bg-white border-4 border-dashed border-slate-300 text-slate-300'
              }`}
            >
              {spellSlots[idx] || '?'}
            </motion.button>
          ))}
        </div>

        {/* Options to click */}
        <div className="flex gap-4 flex-wrap justify-center p-8 bg-white/50 backdrop-blur rounded-[3rem] border-2 border-slate-100">
           {options.map((char: string, idx: number) => {
              // Hide option if already filled in a slot
              const isUsed = spellSlots.includes(char);
              return (
                <motion.button
                  key={idx}
                  whileHover={!isUsed && !isFull ? { scale: 1.1, translateY: -4 } : {}}
                  whileTap={!isUsed && !isFull ? { scale: 0.9 } : {}}
                  disabled={isUsed || isFull}
                  onClick={() => handleOptionClick(char)}
                  className={`w-24 h-24 rounded-2xl flex items-center justify-center text-6xl font-bold shadow-sm transition-all ${
                    isUsed ? 'bg-slate-100 text-slate-300 border-2 border-slate-200 opacity-50' : 'bg-white text-slate-800 border-2 border-slate-200'
                  }`}
                >
                  {char}
                </motion.button>
              )
           })}
        </div>
      </div>
    );
  };

  const renderToneMatch = () => {
    return (
      <div className="mt-12 flex flex-col items-center w-full max-w-4xl px-4">
         {/* Display Word that is missing Tone */}
         <div className="text-8xl font-black text-slate-800 mb-16 bg-white px-12 py-8 rounded-[3rem] shadow-sm border-2 border-slate-100 relative">
            {activity.stimulus.baseWord}
            <div className="absolute -top-6 -right-6 text-6xl bg-yellow-100 w-24 h-24 rounded-full flex items-center justify-center border-4 border-white text-yellow-500 shadow-md animate-pulse">
               ?
            </div>
         </div>

         {/* Options */}
         <div className="flex gap-8 justify-center">
            {activity.stimulus.options.map((opt: any) => (
              <motion.button
                 key={opt.id}
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={() => opt.isCorrect ? handleCorrect() : handleIncorrect()}
                 className="flex-1 min-w-[140px] bg-white border-2 border-slate-200 shadow-sm rounded-3xl p-6 flex flex-col items-center gap-4 hover:border-blue-300 transition-colors"
              >
                 <div className="text-7xl font-bold text-slate-700">{opt.icon}</div>
                 <div className="text-xl font-bold text-slate-500">{opt.text}</div>
              </motion.button>
            ))}
         </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center relative overflow-hidden">
      {/* Top Bar Navigation */}
      <div className="w-full p-4 flex justify-between items-center absolute top-0 left-0 z-20">
         <Button variant="ghost" size="icon" onClick={() => setCurrentView('home')} className="bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-slate-700">
            <CornerUpLeft className="w-6 h-6" />
         </Button>
         <div className="flex gap-2">
            {/* Progress indicators */}
            {sessionActivities.map((_, idx) => (
              <div key={idx} className={`h-3 rounded-full transition-all ${idx < currentActivityIndex ? 'bg-green-500 w-12' : idx === currentActivityIndex ? 'bg-blue-500 w-8' : 'bg-slate-200 w-8'}`} />
            ))}
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center pt-16 z-10">
        
        {/* Instruction Header */}
        <div className="bg-white px-8 py-4 rounded-full shadow-sm flex items-center gap-4 cursor-pointer hover:bg-slate-50 active:scale-95 transition-all text-2xl font-bold text-slate-800 border-2 border-blue-100"
             onClick={() => console.log('Replay audio')}>
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Volume2 className="w-6 h-6 outline-none" />
          </div>
          {activity.instruction}
        </div>

        <AnimatePresence mode="wait">
          {showFeedback === 'success' && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-white/90 backdrop-blur-sm p-12 rounded-[3rem] shadow-2xl flex flex-col items-center">
                <Star className="w-32 h-32 text-yellow-400 fill-current animate-bounce mb-4" />
                <h2 className="text-4xl font-black text-green-600">Tuyệt vời!</h2>
              </div>
            </motion.div>
          )}

          {showFeedback === 'retry' && (
            <motion.div 
              initial={{ x: -20 }}
              animate={{ x: [0, -20, 20, -20, 20, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute inset-x-0 top-32 flex justify-center pointer-events-none z-50"
            >
              <div className="bg-orange-500 text-white px-8 py-3 rounded-full shadow-lg font-bold text-xl flex items-center gap-3">
                Thử lại nhé!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Activity Content */}
        {activity.template === 'listen_select' && renderListenSelect()}
        {activity.template === 'count_touch' && renderCountTouch()}
        {activity.template === 'shape_match' && renderShapeMatch()}
        {activity.template === 'spell_word' && renderSpellWord()}
        {activity.template === 'tone_match' && renderToneMatch()}

      </div>

    </div>
  );
}
