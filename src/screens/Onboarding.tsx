import React, { useState } from 'react';
import { useStore, AgeBand } from '../store';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Baby, BookOpen, Calculator, Sparkles } from 'lucide-react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [ageBand, setAgeBand] = useState<AgeBand>('3-4');
  const [focus, setFocus] = useState<'literacy' | 'math' | 'both'>('both');
  
  const { setChildProfile, setCurrentView } = useStore();

  const handleFinish = () => {
    setChildProfile({ id: '1', name: name || 'Bé', ageBand, focus });
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <Card className="w-full max-w-lg shadow-sm border border-slate-200">
        <CardHeader className="text-center pt-8">
          <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-slate-800">
            {step === 1 ? 'Chào bố mẹ!' : step === 2 ? 'Chọn độ tuổi' : 'Mục tiêu học tập'}
          </CardTitle>
          <p className="text-slate-500 mt-2">
            {step === 1 && 'Cùng con bắt đầu hành trình học vui mỗi ngày.'}
            {step === 2 && 'Để hệ thống chọn bài học phù hợp cho bé.'}
            {step === 3 && 'Mỗi ngày chỉ 10 phút chơi mà học.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên thường gọi của bé</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Cà Rốt, Ben, Xoài..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
              <Button size="lg" className="w-full mt-4" onClick={() => setStep(2)} disabled={!name}>
                Tiếp tục
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {(['3-4', '4-5', '5-6'] as AgeBand[]).map((age) => (
                <button
                  key={age}
                  onClick={() => setAgeBand(age)}
                  className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all ${ageBand === age ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <Baby className={`w-8 h-8 mr-4 ${ageBand === age ? 'text-blue-500' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className="font-bold text-lg text-slate-800">Từ {age} tuổi</div>
                    <div className="text-slate-500 text-sm">Các bài tập phù hợp với tuổi này</div>
                  </div>
                </button>
              ))}
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>Quay lại</Button>
                <Button size="lg" className="flex-1" onClick={() => setStep(3)}>Tiếp tục</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
               {[
                { id: 'both', title: 'Cả hai', icon: Sparkles, color: 'text-purple-500', desc: 'Tiếng Việt & Toán' },
                { id: 'literacy', title: 'Học chữ', icon: BookOpen, color: 'text-orange-500', desc: 'Tiếng Việt' },
                { id: 'math', title: 'Học Toán', icon: Calculator, color: 'text-green-500', desc: 'Tư duy logic' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFocus(f.id as any)}
                  className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all ${focus === f.id ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <f.icon className={`w-8 h-8 mr-4 ${f.color}`} />
                  <div className="text-left">
                    <div className="font-bold text-lg text-slate-800">{f.title}</div>
                    <div className="text-slate-500 text-sm">{f.desc}</div>
                  </div>
                </button>
              ))}
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(2)}>Quay lại</Button>
                <Button variant="secondary" size="lg" className="flex-1" onClick={handleFinish}>Bắt đầu học!</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
