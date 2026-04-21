import { create } from 'zustand';

export type AgeBand = '3-4' | '4-5' | '5-6';

export interface ChildProfile {
  id: string;
  name: string;
  ageBand: AgeBand;
  focus: 'literacy' | 'math' | 'both';
}

export interface SkillProgress {
  skillId: string;
  level: 0 | 1 | 2 | 3 | 4; // 0: unopen, 1: familiar, 2: practicing, 3: progressing, 4: mastered
  accuracy: number;
}

export type AppView = 'onboarding' | 'home' | 'parent_dashboard' | 'child_session' | 'co_play_session' | 'rewards';

interface AppState {
  // Navigation
  currentView: AppView;
  setCurrentView: (view: AppView) => void;

  // Data
  childProfile: ChildProfile | null;
  setChildProfile: (profile: ChildProfile) => void;
  
  progress: SkillProgress[];
  updateProgress: (skillId: string, isCorrect: boolean) => void;

  // Session state
  sessionInProgress: boolean;
  setSessionInProgress: (status: boolean) => void;
  sessionActivitiesCompleted: number;
  incrementSessionActivities: () => void;
  resetSession: () => void;

  // Rewards state
  stars: number;
  addStar: (amount?: number) => void;
  unlockedItems: string[];
  unlockItem: (itemId: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  currentView: 'onboarding',
  setCurrentView: (view) => set({ currentView: view }),

  childProfile: null,
  setChildProfile: (profile) => set({ childProfile: profile }),

  progress: [
    { skillId: 'LIT_LETTER_RECOG', level: 1, accuracy: 0.5 },
    { skillId: 'MTH_COUNT_5', level: 2, accuracy: 0.7 },
  ],
  updateProgress: (skillId, isCorrect) => {
    set((state) => {
      const existing = state.progress.find(p => p.skillId === skillId);
      if (existing) {
        const newAccuracy = existing.accuracy * 0.8 + (isCorrect ? 0.2 : 0);
        let newLevel = existing.level;
        if (newAccuracy > 0.85) newLevel = Math.min(4, newLevel + 1) as any;
        if (newAccuracy < 0.3) newLevel = Math.max(1, newLevel - 1) as any;
        return {
          progress: state.progress.map(p => 
            p.skillId === skillId ? { ...p, accuracy: newAccuracy, level: newLevel } : p
          )
        };
      } else {
        return {
          progress: [...state.progress, { skillId, level: isCorrect ? 2 : 1, accuracy: isCorrect ? 1 : 0 }]
        };
      }
    });
  },

  sessionInProgress: false,
  setSessionInProgress: (status) => set({ sessionInProgress: status }),
  sessionActivitiesCompleted: 0,
  incrementSessionActivities: () => set((state) => ({ sessionActivitiesCompleted: state.sessionActivitiesCompleted + 1 })),
  resetSession: () => set({ sessionInProgress: false, sessionActivitiesCompleted: 0 }),

  stars: 0,
  addStar: (amount = 1) => set((state) => ({ stars: state.stars + amount })),
  unlockedItems: ['sticker_star_basic'],
  unlockItem: (itemId) => set((state) => ({ unlockedItems: [...state.unlockedItems, itemId] })),
}));
