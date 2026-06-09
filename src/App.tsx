import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ModuleContent from './components/ModuleContent';
import InteractiveMap from './components/InteractiveMap';
import HeroFinder from './components/HeroFinder';
import SpeedrunQuizzes from './components/SpeedrunQuizzes';

interface AppProgress {
  modulesCompleted: boolean[];
  quizzesPassed: boolean[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedModule, setSelectedModule] = useState<number>(0);
  
  // Load progress from local storage or initialize empty state
  const [progress, setProgress] = useState<AppProgress>(() => {
    const saved = localStorage.getItem('dota_speedrun_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.modulesCompleted) && Array.isArray(parsed.quizzesPassed)) {
          return parsed;
        }
      } catch (e) {
        // ignore and fallback
      }
    }
    return {
      modulesCompleted: Array(6).fill(false),
      quizzesPassed: Array(6).fill(false)
    };
  });

  // Save progress to local storage on changes
  useEffect(() => {
    localStorage.setItem('dota_speedrun_progress', JSON.stringify(progress));
  }, [progress]);

  const setModulesCompleted = (completed: boolean[]) => {
    setProgress((prev) => ({
      ...prev,
      modulesCompleted: completed
    }));
  };

  const setQuizzesPassed = (passed: boolean[]) => {
    setProgress((prev) => ({
      ...prev,
      quizzesPassed: passed
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            setActiveTab={setActiveTab} 
            setSelectedModule={setSelectedModule}
            progress={progress}
          />
        );
      case 'masterclass':
        return (
          <ModuleContent 
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            progress={progress}
            setModulesCompleted={setModulesCompleted}
            setActiveTab={setActiveTab}
          />
        );
      case 'map':
        return <InteractiveMap />;
      case 'hero-finder':
        return <HeroFinder />;
      case 'quizzes':
        return (
          <SpeedrunQuizzes 
            progress={progress} 
            setQuizzesPassed={setQuizzesPassed} 
          />
        );
      default:
        return (
          <Dashboard 
            setActiveTab={setActiveTab} 
            setSelectedModule={setSelectedModule}
            progress={progress}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Menu */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        progress={progress}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}
