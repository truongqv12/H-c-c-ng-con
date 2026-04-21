import React from 'react';
import { useStore } from '../store';
import { Button } from '../components/ui/button';
import { Card, CardTitle, CardContent, CardHeader } from '../components/ui/card';
import { ArrowLeft, User } from 'lucide-react';

export default function ParentDashboard() {
  const { childProfile, progress, setCurrentView } = useStore();

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return { text: 'Đang làm quen', dot: 'bg-slate-300' };
      case 2: return { text: 'Đang luyện', dot: 'bg-orange-500' };
      case 3: return { text: 'Gần vững', dot: 'bg-blue-500' };
      case 4: return { text: 'Đã vững', dot: 'bg-green-500' };
      default: return { text: 'Chưa học', dot: 'bg-slate-200' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center select-none overflow-x-hidden font-sans">
      <div className="w-full max-w-6xl space-y-6 flex-grow flex flex-col">
        
        {/* Header */}
        <header className="px-8 py-6 bg-white border-b border-slate-200 rounded-2xl flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setCurrentView('home')} className="rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 h-10 w-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 m-0 leading-tight">Góc ba mẹ</h1>
              <p className="text-[13px] text-slate-500 m-0 mt-0.5">Tiến độ tuần 12</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              ● Đang học tốt
            </span>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex justify-center items-center text-slate-500 font-semibold text-sm border border-slate-200">
               {childProfile?.name?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
            </div>
          </div>
        </header>

        {/* Bento Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 flex-grow">
          
          {/* Card 1: Kỹ năng Tiếng Việt & Toán (col-span-2, row-span-2) */}
          <Card className="md:col-span-2 md:row-span-2">
            <div>
              <CardTitle>Chi tiết tiến độ kỹ năng</CardTitle>
              <div className="flex flex-col mt-4 m-0 p-0">
                
                <div className="flex items-center py-3 border-b border-slate-100">
                  <div className={`w-2 h-2 rounded-full mr-3 ${getLevelLabel(progress[0]?.level || 1).dot}`}></div>
                  <div className="flex-1">
                     <div className="text-sm font-bold text-slate-900">Nhận diện chữ cái</div>
                     <div className="text-xs text-slate-500">Tiếng Việt</div>
                  </div>
                  <div className="flex flex-col items-end min-w-[80px]">
                     <span className="text-[11px] font-medium text-slate-400 mb-1.5 uppercase tracking-wider">{getLevelLabel(progress[0]?.level || 1).text}</span>
                     <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(progress[0]?.accuracy || 0) * 100}%` }}></div>
                     </div>
                  </div>
                </div>

                <div className="flex items-center py-3 border-b border-slate-100">
                  <div className="w-2 h-2 rounded-full mr-3 bg-slate-200"></div>
                  <div className="flex-1">
                     <div className="text-sm font-bold text-slate-900">Nghe & Phân biệt âm đầu</div>
                     <div className="text-xs text-slate-500">Tiếng Việt</div>
                  </div>
                  <div className="flex flex-col items-end min-w-[80px]">
                     <span className="text-[11px] font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Chưa học</span>
                     <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"></div>
                  </div>
                </div>

                <div className="flex items-center py-3 border-b border-slate-100">
                  <div className={`w-2 h-2 rounded-full mr-3 ${getLevelLabel(progress[1]?.level || 2).dot}`}></div>
                  <div className="flex-1">
                     <div className="text-sm font-bold text-slate-900">Đếm số lượng 1-5</div>
                     <div className="text-xs text-slate-500">Toán & Logic</div>
                  </div>
                  <div className="flex flex-col items-end min-w-[80px]">
                     <span className="text-[11px] font-medium text-slate-400 mb-1.5 uppercase tracking-wider">{getLevelLabel(progress[1]?.level || 2).text}</span>
                     <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(progress[1]?.accuracy || 0) * 100}%` }}></div>
                     </div>
                  </div>
                </div>

                <div className="flex items-center py-3 border-none">
                  <div className="w-2 h-2 rounded-full mr-3 bg-slate-300"></div>
                  <div className="flex-1">
                     <div className="text-sm font-bold text-slate-900">Nhận biết & Ghép quy luật</div>
                     <div className="text-xs text-slate-500">Toán & Logic</div>
                  </div>
                  <div className="flex flex-col items-end min-w-[80px]">
                     <span className="text-[11px] font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Làm quen</span>
                     <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-600 rounded-full" style={{ width: '20%' }}></div>
                     </div>
                  </div>
                </div>

              </div>
            </div>
            <button className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-semibold mt-4 text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
              Xem toàn bộ {progress.length + 2} kỹ năng
            </button>
          </Card>

          {/* Card 2: Tổng thời gian học */}
          <Card>
            <div>
              <CardTitle>Thời gian tuần này</CardTitle>
              <div className="text-[32px] font-bold text-slate-900 mt-2">45<span className="text-lg font-medium text-slate-500 ml-1">phút</span></div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-3">
              Mục tiêu: 60 phút/tuần
            </div>
          </Card>

          {/* Card 3: Kỹ năng đang luyện */}
          <Card>
             <div>
               <CardTitle>Kỹ năng đang luyện</CardTitle>
               <div className="text-[32px] font-bold text-orange-500 mt-2">2</div>
             </div>
             <div className="text-xs text-slate-500 mt-3">Kỹ năng mới cần ôn thêm</div>
          </Card>

          {/* Card 4: Dark Card (Gợi ý) - md:col-span-2 */}
          <div className="bg-slate-900 text-white border-none rounded-2xl p-5 flex flex-col justify-between shadow-sm md:col-span-2 overflow-hidden relative">
            <div className="relative z-10 w-full">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Gợi ý học cùng con</div>
              <div className="text-[20px] leading-snug font-light my-3">
                Bé đang làm quen với đếm đồ vật. Hãy nhờ bé lấy <span className="font-medium text-amber-300">3 chiếc muỗng</span> khi dọn cơm tối nhé.
              </div>
            </div>
            <div className="flex justify-between items-center relative z-10 mt-2 border-t border-slate-800 pt-3 w-full">
              <div className="text-[13px] text-slate-400">Hoạt động thực tế</div>
              <div className="text-[13px] font-semibold text-white cursor-pointer hover:underline">Tiếp theo &rarr;</div>
            </div>
          </div>

          {/* Card 5: Kỹ năng đã vững */}
          <Card>
             <div>
               <CardTitle>Kỹ năng đã vững</CardTitle>
               <div className="text-[32px] font-bold text-green-600 mt-2">1</div>
             </div>
             <div className="text-xs text-slate-500 mt-3">Thành thạo trong tuần</div>
          </Card>

          {/* Card 6: Report Assets */}
          <Card>
            <div>
              <CardTitle>Tài liệu hỗ trợ</CardTitle>
              <div className="flex flex-col gap-2 mt-3">
                 <div className="text-[13px] text-indigo-600 underline cursor-pointer">Bảng_chữ_cái.pdf</div>
                 <div className="text-[13px] text-indigo-600 underline cursor-pointer">Thẻ_đếm_số.pdf</div>
                 <div className="text-[13px] text-indigo-600 underline cursor-pointer">Gợi_ý_chơi.pdf</div>
              </div>
            </div>
          </Card>

          {/* Card 7: Nhịp độ học tập (col-span-2) */}
          <Card className="md:col-span-2">
             <div>
               <CardTitle>Nhịp độ học tập</CardTitle>
               <div className="grid grid-cols-7 gap-1 mt-3 h-10 items-end">
                 <div className="h-[100%] bg-green-500 rounded-sm"></div>
                 <div className="h-[80%] bg-green-500 rounded-sm"></div>
                 <div className="h-[20%] bg-slate-100 rounded-sm"></div>
                 <div className="h-[60%] bg-green-500 rounded-sm"></div>
                 <div className="h-[100%] bg-yellow-400 rounded-sm"></div>
                 <div className="h-[90%] bg-green-500 rounded-sm"></div>
                 <div className="h-[100%] bg-green-500 rounded-sm"></div>
               </div>
             </div>
             <div className="text-[11px] text-slate-500 mt-4">Duy trì thói quen: 5/7 ngày gần nhất</div>
          </Card>

        </div>
      </div>
    </div>
  );
}
