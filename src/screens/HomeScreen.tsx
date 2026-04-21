import React from 'react';
import { useStore } from '../store';
import { Button } from '../components/ui/button';
import { Play, Settings, BarChart2 } from 'lucide-react';

export default function HomeScreen() {
  const { childProfile, setCurrentView } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col items-center py-12 px-4 relative">
      <div className="relative z-10 w-full max-w-4xl max-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-16">
        <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm font-bold text-slate-800 text-lg flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl">
            {childProfile?.name?.[0]?.toUpperCase() || 'B'}
          </div>
          Xin chào, {childProfile?.name || 'Bé'}!
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="outline" className="bg-white w-full rounded-2xl px-6 shadow-sm border border-slate-200 items-center flex gap-2" onClick={() => setCurrentView('parent_dashboard')}>
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-slate-700">Dành cho ba mẹ</span>
          </Button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-20 w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight text-center mb-12 drop-shadow-sm">
          Bài học hôm nay<br/><span className="text-indigo-600 text-2xl md:text-3xl">Chỉ 10 phút chơi mà học!</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
           {/* Self-play Card */}
           <div className="bg-white rounded-3xl p-8 border-2 border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-indigo-300 transition-colors flex flex-col items-center text-center cursor-pointer group"
                onClick={() => setCurrentView('child_session')}>
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-indigo-600 ml-2" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Bé tự học</h2>
              <p className="text-slate-500 mb-6 text-sm">3 trò chơi tương tác (khoảng 5-10 phút)</p>
              <Button className="w-full rounded-2xl h-14 text-lg">Bắt đầu ngay</Button>
           </div>
           
           {/* Co-play Card */}
           <div className="bg-white rounded-3xl p-8 border-2 border-emerald-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-emerald-300 transition-colors flex flex-col items-center text-center cursor-pointer group"
                onClick={() => setCurrentView('co_play_session')}>
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-5xl">🤝</div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Học cùng ba mẹ</h2>
              <p className="text-slate-500 mb-6 text-sm">Hoạt động tương tác thực tế (3-5 phút)</p>
              <Button className="w-full rounded-2xl h-14 text-lg bg-emerald-500 hover:bg-emerald-600 text-white">Chơi cùng con</Button>
           </div>
        </div>

        {/* Additional actions */}
        <div className="mt-8 flex justify-center w-full px-4">
           <Button variant="outline" className="bg-white rounded-2xl h-14 px-8 border-2 border-slate-200 text-slate-700 shadow-sm" onClick={() => setCurrentView('rewards')}>
              <span className="text-2xl mr-2">⭐</span> Xem phần thưởng
           </Button>
        </div>
      </div>
      
    </div>
  );
}
