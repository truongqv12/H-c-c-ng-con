/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useStore } from './store';
import Onboarding from './screens/Onboarding';
import HomeScreen from './screens/HomeScreen';
import ParentDashboard from './screens/ParentDashboard';
import ChildSession from './screens/ChildSession';
import CoPlaySession from './screens/CoPlaySession';
import RewardsScreen from './screens/RewardsScreen';

export default function App() {
  const currentView = useStore((state) => state.currentView);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {currentView === 'onboarding' && <Onboarding />}
      {currentView === 'home' && <HomeScreen />}
      {currentView === 'parent_dashboard' && <ParentDashboard />}
      {currentView === 'child_session' && <ChildSession />}
      {currentView === 'co_play_session' && <CoPlaySession />}
      {currentView === 'rewards' && <RewardsScreen />}
    </div>
  );
}
