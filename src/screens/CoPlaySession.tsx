import React, { useState } from 'react';
import { useStore } from '../store';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, CheckCircle2, ChevronRight, HeartHandshake } from 'lucide-react';
import { coPlayActivities } from '../data/mockCoPlay';

export default function CoPlaySession() {
  const { setCurrentView, addStar, incrementSessionActivities, updateProgress } = useStore();
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const activity = coPlayActivities[currentActivityIndex];
  const step = activity?.steps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < activity.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Activity done
      if (currentActivityIndex < coPlayActivities.length - 1) {
        setCurrentActivityIndex(currentActivityIndex + 1);
        setCurrentStepIndex(0);
      } else {
        setIsFinished(true);
        addStar(1);
        incrementSessionActivities();
      }
    }
  };

  const handleFeedback = (isCorrect: boolean) => {
    updateProgress(activity.skill, isCorrect);
    handleNextStep();
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-6 text-center">
        <HeartHandshake className="w-32 h-32 text-pink-500 mb-6" />
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Tuyệt vời!</h1>
        <p className="text-xl text-slate-600 mb-8 max-w-lg">
          Ba mẹ và bé đã hoàn thành hoạt động tương tác. Trẻ học tốt nhất khi có sự động viên từ gia đình!
        </p>
        <div className="bg-white px-8 py-4 rounded-3xl shadow-sm mb-8 flex items-center gap-4 border border-yellow-200">
           <span className="text-3xl">⭐</span>
           <span className="font-bold text-xl text-slate-700">Bé nhận được 1 Ngôi Sao!</span>
        </div>
        <Button size="lg" onClick={() => setCurrentView('home')}>Trở về màn hình chính</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl flex-grow flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 relative">
           <Button variant="outline" size="icon" className="rounded-full absolute left-0" onClick={() => setCurrentView('home')}>
              <ArrowLeft className="w-5 h-5" />
           </Button>
           <h1 className="text-xl font-bold text-slate-800 text-center w-full">Học Cùng Con</h1>
        </div>

        {/* Content */}
        <Card className="flex-grow border-none shadow-xl flex flex-col overflow-hidden bg-white rounded-[2rem]">
          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-100">
             <div 
               className="h-full bg-indigo-500 transition-all duration-300" 
               style={{ width: `${((currentStepIndex) / activity.steps.length) * 100}%` }}
             />
          </div>

          <CardContent className="flex-grow flex flex-col items-center justify-center p-8 md:p-16 text-center relative">
             <div className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 uppercase tracking-wider">
               {activity.title}
             </div>
             
             {step?.type === 'feedback' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                    {step.text}
                  </h2>
                  <div className="flex gap-4 justify-center mt-12 w-full">
                     <Button size="huge" variant="outline" className="flex-1 border-orange-200 hover:bg-orange-50 text-orange-600" onClick={() => handleFeedback(false)}>
                        Cần cố gắng thêm
                     </Button>
                     <Button size="huge" variant="default" className="flex-1 bg-green-500 hover:bg-green-600" onClick={() => handleFeedback(true)}>
                        Bé làm rất tốt!
                     </Button>
                  </div>
                </div>
             ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                    {step.text}
                  </h2>
                  {step.isAction && (
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center animate-pulse mt-8">
                       <CheckCircle2 className="w-8 h-8 text-blue-600" />
                    </div>
                  )}
                  <div className="absolute w-full bottom-0 left-0 p-8">
                    <Button size="lg" className="w-full text-lg h-16 rounded-2xl" onClick={handleNextStep}>
                      Đã xong <ChevronRight className="ml-2 w-6 h-6" />
                    </Button>
                  </div>
                </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
