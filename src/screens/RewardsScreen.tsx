import React from 'react';
import { useStore } from '../store';
import { Button } from '../components/ui/button';
import { ArrowLeft, Star, Lock } from 'lucide-react';
import { motion } from 'motion/react';

const REWARD_CATALOG = [
  { id: 'sticker_star_basic', name: 'Ngôi sao nhỏ', icon: '⭐', cost: 0 },
  { id: 'sticker_rocket', name: 'Tên lửa siêu tốc', icon: '🚀', cost: 3 },
  { id: 'sticker_cat', name: 'Mèo con vui vẻ', icon: '🐱', cost: 5 },
  { id: 'sticker_dino', name: 'Khủng long xanh', icon: '🦖', cost: 10 },
  { id: 'badge_math', name: 'Huy hiệu tính toán', icon: '🧮', cost: 15 },
  { id: 'badge_reading', name: 'Huy hiệu đọc chữ', icon: '📖', cost: 15 },
  { id: 'crown_gold', name: 'Vương miện vàng', icon: '👑', cost: 20 },
  { id: 'robot_friend', name: 'Bạn Robot', icon: '🤖', cost: 30 },
];

export default function RewardsScreen() {
  const { stars, unlockedItems, setCurrentView, unlockItem, addStar } = useStore();

  const handleUnlock = (item: any) => {
    if (stars >= item.cost && !unlockedItems.includes(item.id)) {
      addStar(-item.cost);
      unlockItem(item.id);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-6">
        
        {/* Header */}
        <header className="px-8 py-6 bg-white border border-slate-200 rounded-3xl flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setCurrentView('home')} className="rounded-xl w-12 h-12 bg-slate-50 text-slate-600 hover:bg-slate-100">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 m-0 leading-tight">Bộ sưu tập của bé</h1>
              <p className="text-sm text-slate-500 m-0 mt-1">Cố gắng học mỗi ngày để nhận sao nhé!</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl border border-yellow-200">
            <Star className="w-6 h-6 fill-current text-yellow-500" />
            <span className="text-xl font-bold">{stars} Ngôi sao</span>
          </div>
        </header>

        {/* Grid of Rewards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {REWARD_CATALOG.map((item) => {
            const isUnlocked = unlockedItems.includes(item.id);
            const canAfford = stars >= item.cost;
            return (
              <motion.div 
                whileHover={!isUnlocked && canAfford ? { scale: 1.05 } : {}}
                key={item.id} 
                className={`col-span-1 rounded-3xl border-2 p-6 flex flex-col items-center justify-center text-center transition-all bg-white shadow-sm ${
                  isUnlocked 
                    ? 'border-green-200 bg-gradient-to-b from-white to-green-50' 
                    : canAfford 
                      ? 'border-yellow-300 cursor-pointer hover:shadow-md'
                      : 'border-slate-100 opacity-60'
                }`}
                onClick={() => handleUnlock(item)}
              >
                <div className="text-6xl mb-4 relative drop-shadow-md">
                  {item.icon}
                  {!isUnlocked && !canAfford && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[2px] rounded-full">
                       <Lock className="w-8 h-8 text-slate-500" />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight">{item.name}</h3>
                
                {isUnlocked ? (
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Đã mở khóa</span>
                ) : (
                  <div className={`flex items-center gap-1 font-bold text-sm px-3 py-1.5 rounded-full ${
                    canAfford ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors' : 'text-slate-500 bg-slate-100'
                  }`}>
                    {canAfford ? 'Bấm để đổi!' : `Cần ${item.cost} Sao`}
                    {!canAfford && <Star className="w-4 h-4 fill-current text-amber-400" />}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  );
}
