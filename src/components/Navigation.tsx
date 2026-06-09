import { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Map, 
  Swords, 
  HelpCircle, 
  Menu, 
  X, 
  Flame,
  CheckCircle2
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progress: {
    modulesCompleted: boolean[];
    quizzesPassed: boolean[];
  };
}

export default function Navigation({ activeTab, setActiveTab, progress }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', name: 'Speedrun Dashboard', icon: LayoutDashboard },
    { id: 'masterclass', name: 'Masterclass Guide', icon: BookOpen },
    { id: 'map', name: 'Interactive Map', icon: Map },
    { id: 'hero-finder', name: 'MOBA Hero Transfer', icon: Swords },
    { id: 'quizzes', name: 'Knowledge Checks', icon: HelpCircle }
  ];

  const modulesCount = progress.modulesCompleted.filter(Boolean).length;
  const quizzesCount = progress.quizzesPassed.filter(Boolean).length;

  const totalModules = progress.modulesCompleted.length;
  const totalQuizzes = progress.quizzesPassed.length;

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="mobile-header glass-panel">
        <div className="mobile-header-content">
          <div className="logo-container">
            <Flame className="logo-icon animate-pulse" size={24} color="#d4af37" />
            <span className="logo-text">DOTA <span className="logo-highlight">SPEEDRUN</span></span>
          </div>
          <button className="menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Sidebar Backdrop Overlay on Mobile */}
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`sidebar glass-panel ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <Flame className="logo-icon" size={32} color="#d4af37" />
            <div>
              <span className="logo-text">DOTA <span className="logo-highlight">SPEEDRUN</span></span>
              <p className="logo-sub">100% MASTERCLASS</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`menu-item ${isActive ? 'menu-item-active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
              >
                <Icon size={20} className="menu-item-icon" />
                <span>{item.name}</span>
                {isActive && <div className="active-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer - Progress Status */}
        <div className="sidebar-progress glass-card">
          <h4 className="progress-title">Your Progress</h4>
          <div className="progress-stat">
            <div className="stat-label">
              <span>Modules Read</span>
              <span className="stat-value">{modulesCount}/{totalModules}</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill fill-purple" 
                style={{ width: `${(modulesCount / totalModules) * 100}%` }}
              />
            </div>
          </div>

          <div className="progress-stat">
            <div className="stat-label">
              <span>Quizzes Passed</span>
              <span className="stat-value">{quizzesCount}/{totalQuizzes}</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill fill-gold" 
                style={{ width: `${(quizzesCount / totalQuizzes) * 100}%` }}
              />
            </div>
          </div>

          {modulesCount === totalModules && quizzesCount === totalQuizzes && (
            <div className="completion-badge badge-gold">
              <CheckCircle2 size={14} />
              <span>Dota Master Graduate</span>
            </div>
          )}
        </div>
      </aside>

      {/* CSS specific to Navigation Component */}
      <style>{`
        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--navbar-height);
          z-index: 1000;
          padding: 0 20px;
          border-width: 0 0 1px 0;
        }

        .mobile-header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .menu-btn {
          background: transparent;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
        }

        .menu-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: var(--sidebar-width);
          z-index: 999;
          display: flex;
          flex-direction: column;
          border-width: 0 1px 0 0;
        }

        .sidebar-header {
          padding: 30px 24px;
          border-bottom: 1px solid var(--border-light);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
        }

        .logo-text {
          font-family: var(--font-headings);
          font-weight: 900;
          font-size: 1.35rem;
          letter-spacing: -0.03em;
          color: #fff;
        }

        .logo-highlight {
          color: var(--color-accent-gold);
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }

        .logo-sub {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          font-weight: 700;
          margin-top: -2px;
        }

        .sidebar-menu {
          flex: 1;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }

        .menu-item {
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 10px;
          text-align: left;
          font-size: 0.95rem;
          font-weight: 550;
          position: relative;
        }

        .menu-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.03);
        }

        .menu-item-active {
          color: #fff;
          background: rgba(142, 68, 173, 0.1);
          border: 1px solid rgba(142, 68, 173, 0.2);
        }

        .menu-item-icon {
          transition: transform var(--transition-fast);
        }

        .menu-item:hover .menu-item-icon {
          transform: scale(1.1);
        }

        .menu-item-active .menu-item-icon {
          color: var(--color-primary);
          filter: drop-shadow(0 0 5px var(--color-primary-glow));
        }

        .active-indicator {
          position: absolute;
          right: 12px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-primary);
          box-shadow: 0 0 10px var(--color-primary);
        }

        .sidebar-progress {
          margin: 20px 16px 30px;
          padding: 20px;
          border-color: rgba(142, 68, 173, 0.15);
        }

        .progress-title {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .progress-stat {
          margin-bottom: 14px;
        }

        .stat-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 6px;
          color: var(--text-muted);
        }

        .stat-value {
          color: #fff;
          font-weight: 600;
        }

        .progress-bar-bg {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 100px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 100px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fill-purple {
          background: linear-gradient(90deg, var(--color-primary), #a83279);
          box-shadow: 0 0 8px var(--color-primary-glow);
        }

        .fill-gold {
          background: linear-gradient(90deg, var(--color-accent-gold), #b38600);
          box-shadow: 0 0 8px var(--color-accent-gold-glow);
        }

        .completion-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 10px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .sidebar-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(6, 5, 10, 0.75);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 998;
        }

        @media (max-width: 992px) {
          .mobile-header {
            display: block;
          }

          .sidebar {
            transform: translateX(-100%);
            transition: transform var(--transition-normal);
            box-shadow: none;
            width: 100%;
            max-width: 320px;
            padding-top: var(--navbar-height);
          }

          .sidebar-open {
            transform: translateX(0);
            box-shadow: 0 0 100px rgba(0,0,0,0.8);
          }

          .sidebar-header {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
