import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Target, 
  ChevronRight, 
  Award, 
  TrendingUp, 
  Quote
} from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
  setSelectedModule: (index: number) => void;
  progress: {
    modulesCompleted: boolean[];
    quizzesPassed: boolean[];
  };
}

interface Drill {
  id: string;
  title: string;
  description: string;
  target: string;
  category: string;
  completed: boolean;
}

export default function Dashboard({ setActiveTab, setSelectedModule, progress }: DashboardProps) {
  const [drills, setDrills] = useState<Drill[]>(() => {
    const saved = localStorage.getItem('dota_speedrun_drills');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'drill-1',
        title: 'The 10-Min Last Hit Challenge',
        description: 'Go to Heroes -> Demo Hero (choose a carry like Anti-Mage or Juggernaut). Practice last hitting without items or abilities.',
        target: 'Get at least 60 Last Hits (LH) and 20 Denies (DN) by the 10:00 mark.',
        category: 'Laning Mechanics',
        completed: false
      },
      {
        id: 'drill-2',
        title: 'Creep Aggro Manipulation Drill',
        description: 'Play a match or lobby. Every time you want to hit a creep or the enemy, click an enemy hero anywhere on the map to pull enemy creeps towards your ranged creep.',
        target: 'Pull aggro at least 15 times in the first 5 minutes to secure safe last hits.',
        category: 'Laning Mechanics',
        completed: false
      },
      {
        id: 'drill-3',
        title: 'Support Stack & Pull Rhythm',
        description: 'Play a support hero. At 1:17/2:17, stack the small camp. At 1:45/2:45, pull the small camp into your lane creeps when they push past your tower.',
        target: 'Successfully perform 5 stacks and 3 pulls in a single match.',
        category: 'Economy',
        completed: false
      },
      {
        id: 'drill-4',
        title: 'Wisdom Rune & Lotus Capture',
        description: 'Set a mental alarm. At 3:00, 6:00, 9:00 capture Lotus Pools. At 7:00, 14:00, 21:00 secure the Wisdom Rune on either side.',
        target: 'Capture at least 3 Lotuses and 2 Wisdom Runes in a single match.',
        category: 'Map Objectives',
        completed: false
      },
      {
        id: 'drill-5',
        title: 'Quickbuy & Courier Micro Drill',
        description: 'Practice using hotkeys to place items on Quickbuy, using your courier to deliver items, and sending the courier to secret shop/fountain safely.',
        target: 'Zero courier deaths and under 5 seconds of delay in purchasing core items in a match.',
        category: 'UI & Mechanics',
        completed: false
      },
      {
        id: 'drill-6',
        title: 'The BKB Debuff Immunity Test',
        description: 'Buy a Black King Bar. Activate BKB only AFTER enemy spells are cast at you, or right before major stuns land. Avoid wasting charges pre-emptively.',
        target: 'Successfully absorb 3 non-piercing disables using BKB active in a single match.',
        category: 'Teamfighting',
        completed: false
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('dota_speedrun_drills', JSON.stringify(drills));
  }, [drills]);

  const toggleDrill = (id: string) => {
    setDrills(drills.map(drill => 
      drill.id === id ? { ...drill, completed: !drill.completed } : drill
    ));
  };

  const modules = [
    { title: 'The Core Fundamentals', desc: 'Map Layout, Positions 1-5, Gold & XP, Innate Abilities & Facets.' },
    { title: 'Laning Stage Excellence', desc: 'Last Hitting, Denying, Creep Aggro, Pulling & Stacking, Trading.' },
    { title: 'Objectives & Economy', desc: 'Roshan pit cycles, Tormentors, Lotus Pools, Wisdom Runes, Twin Gates.' },
    { title: 'Hero Stats & Itemization', desc: 'STR/AGI/INT/Universal, Dispels, Damage types, BKB & Debuff Immunity.' },
    { title: 'Mid-to-Late Game Strategy', desc: 'Map rotations, Smoke of Deceit, High-Ground sieging, Buyback control.' },
    { title: 'Drafting & Game Mindset', desc: 'Hero synergies, Counter-picking, communication, tilt management.' }
  ];

  const trophies = [
    { name: 'Laning Initiate', desc: 'Pass Chapter 1 & 2 Quizzes', achieved: progress.quizzesPassed[0] && progress.quizzesPassed[1] },
    { name: 'Objective Master', desc: 'Pass Chapter 3 Quiz', achieved: progress.quizzesPassed[2] },
    { name: 'Tactical Itemizer', desc: 'Pass Chapter 4 Quiz', achieved: progress.quizzesPassed[3] },
    { name: 'Strategic Commander', desc: 'Pass Chapter 5 & 6 Quizzes', achieved: progress.quizzesPassed[4] && progress.quizzesPassed[5] },
    { name: 'Speedrun Legend', desc: 'Pass all quizzes & complete all drills', achieved: progress.quizzesPassed.every(Boolean) && drills.every(d => d.completed) }
  ];

  const handleModuleClick = (idx: number) => {
    setSelectedModule(idx);
    setActiveTab('masterclass');
  };

  const drillsCompletedCount = drills.filter(d => d.completed).length;

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Hero Header Banner */}
      <section className="dashboard-banner glass-card gold-hover">
        <div className="banner-content">
          <div className="badge badge-gold banner-badge">
            <Flame size={12} />
            <span>Fast-track Dota Masterclass</span>
          </div>
          <h1 className="banner-title">Welcome to Dota Speedrun</h1>
          <p className="banner-desc">
            You know how to play MOBAs, but Dota 2 is a completely different beast.
            Here, we skip the basic "how to move your hero" lectures.
            Instead, we dive straight into high-tier laning mechanics, map macro, patch 7.36 facets/innates, BKB debuff immunity, and tournament-level strategies.
          </p>
          <div className="banner-actions">
            <button className="btn btn-gold" onClick={() => handleModuleClick(0)}>
              Start Masterclass <ChevronRight size={16} />
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('map')}>
              Explore Map Objectives
            </button>
          </div>
        </div>
      </section>

      {/* Stats and Trophies Row */}
      <div className="grid-3 stats-trophies-row">
        <div className="glass-card stat-metric">
          <TrendingUp className="metric-icon" size={28} color="#8e44ad" />
          <div>
            <span className="metric-title">Masterclass Phase</span>
            <h3 className="metric-value">
              {progress.modulesCompleted.filter(Boolean).length === 6 
                ? 'Ready for Rank' 
                : `Phase ${progress.modulesCompleted.filter(Boolean).length + 1} / 6`}
            </h3>
            <p className="metric-sub">Modules completed: {progress.modulesCompleted.filter(Boolean).length} of 6</p>
          </div>
        </div>

        <div className="glass-card stat-metric">
          <Target className="metric-icon" size={28} color="#d4af37" />
          <div>
            <span className="metric-title">Drills Completed</span>
            <h3 className="metric-value">{drillsCompletedCount} / {drills.length}</h3>
            <p className="metric-sub">Hands-on in-game practice</p>
          </div>
        </div>

        <div className="glass-card stat-metric">
          <Trophy className="metric-icon" size={28} color="#2ecc71" />
          <div>
            <span className="metric-title">Trophies Earned</span>
            <h3 className="metric-value">
              {trophies.filter(t => t.achieved).length} / {trophies.length}
            </h3>
            <p className="metric-sub">Trophies show knowledge check mastery</p>
          </div>
        </div>
      </div>

      <div className="dashboard-layout-grid">
        {/* Course Roadmap Column */}
        <div className="roadmap-column">
          <h2 className="section-title">Masterclass Roadmap</h2>
          <div className="roadmap-timeline">
            {modules.map((mod, idx) => {
              const isCompleted = progress.modulesCompleted[idx];
              const isPassed = progress.quizzesPassed[idx];
              return (
                <div 
                  key={idx} 
                  className={`roadmap-node glass-card ${isCompleted ? 'node-completed' : ''}`}
                  onClick={() => handleModuleClick(idx)}
                >
                  <div className="node-number-container">
                    <div className="node-number">0{idx + 1}</div>
                    {isCompleted && <div className="node-check">✓</div>}
                  </div>
                  <div className="node-text">
                    <h4 className="node-title">{mod.title}</h4>
                    <p className="node-desc">{mod.desc}</p>
                    <div className="node-status-tags">
                      <span className={`badge ${isCompleted ? 'badge-primary' : 'badge-secondary'}`}>
                        {isCompleted ? 'Read' : 'Unread'}
                      </span>
                      <span className={`badge ${isPassed ? 'badge-gold' : 'badge-secondary'}`}>
                        {isPassed ? 'Quiz Passed' : 'Quiz Open'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="node-arrow" size={20} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Checklist & Quotes Column */}
        <div className="sidebar-column">
          {/* Pro Quotes */}
          <div className="glass-card quote-card">
            <Quote className="quote-icon" size={32} color="rgba(212, 175, 55, 0.2)" />
            <p className="quote-text">
              "Dota is a game of resources, time, and attention. If you waste a single wave of creeps under tower, or fail to watch the minimap for 10 seconds, a pro player will take half the map away from you."
            </p>
            <div className="quote-author">
              <span className="author-name">Johan "N0tail" Sundstein</span>
              <span className="author-title">2x TI Champion & OG Captain</span>
            </div>
          </div>

          {/* Drills Checklist */}
          <div className="glass-card drills-card">
            <div className="drills-header">
              <h3 className="card-title">In-Game Practice Drills</h3>
              <span className="badge badge-gold">{drillsCompletedCount}/{drills.length}</span>
            </div>
            <p className="card-subtitle">Complete these practical exercises in-game to solidify your mechanical skills.</p>
            
            <div className="drills-list">
              {drills.map((drill) => (
                <div key={drill.id} className={`drill-item ${drill.completed ? 'drill-completed' : ''}`}>
                  <label className="drill-checkbox-container">
                    <input 
                      type="checkbox" 
                      checked={drill.completed}
                      onChange={() => toggleDrill(drill.id)}
                    />
                    <span className="checkmark" />
                  </label>
                  <div className="drill-body">
                    <div className="drill-meta">
                      <span className="drill-category">{drill.category}</span>
                    </div>
                    <h4 className="drill-title-text">{drill.title}</h4>
                    <p className="drill-description-text">{drill.description}</p>
                    <div className="drill-target">
                      <strong>Gold Target:</strong> {drill.target}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Trophies */}
          <div className="glass-card trophies-card">
            <h3 className="card-title">Knowledge Trophies</h3>
            <div className="trophies-list">
              {trophies.map((trophy, index) => (
                <div 
                  key={index} 
                  className={`trophy-badge-item ${trophy.achieved ? 'trophy-unlocked' : 'trophy-locked'}`}
                >
                  <div className="trophy-icon-container">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="trophy-name">{trophy.name}</h4>
                    <p className="trophy-desc">{trophy.desc}</p>
                  </div>
                  <span className="trophy-status">
                    {trophy.achieved ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Component Styles */}
      <style>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .dashboard-banner {
          position: relative;
          padding: 48px;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(21, 18, 38, 0.85), rgba(12, 9, 23, 0.95));
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        .banner-content {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          z-index: 2;
          position: relative;
        }

        .banner-badge {
          align-self: flex-start;
          gap: 6px;
        }

        .banner-title {
          font-size: 2.8rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #fff 40%, var(--color-accent-gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .banner-desc {
          color: var(--text-muted);
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .banner-actions {
          display: flex;
          gap: 16px;
          margin-top: 12px;
        }

        @media (max-width: 768px) {
          .dashboard-banner {
            padding: 24px;
          }
          .banner-title {
            font-size: 2rem;
          }
          .banner-actions {
            flex-direction: column;
            gap: 10px;
          }
        }

        .stats-trophies-row {
          margin-top: -8px;
        }

        .stat-metric {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px;
          border-radius: 12px;
          background: rgba(21, 18, 38, 0.6);
        }

        .metric-icon {
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid var(--border-light);
          flex-shrink: 0;
        }

        .metric-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-value {
          font-size: 1.6rem;
          font-weight: 800;
          margin: 2px 0;
          color: #fff;
        }

        .metric-sub {
          font-size: 0.8rem;
          color: var(--text-dim);
        }

        .dashboard-layout-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 32px;
          align-items: start;
        }

        @media (max-width: 1200px) {
          .dashboard-layout-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .section-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          border-left: 4px solid var(--color-primary);
          padding-left: 12px;
        }

        .roadmap-timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .roadmap-node {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          cursor: pointer;
          border-color: rgba(255, 255, 255, 0.05);
        }

        .roadmap-node:hover {
          border-color: var(--border-glow);
          background: rgba(21, 18, 38, 0.8);
        }

        .node-number-container {
          position: relative;
          flex-shrink: 0;
        }

        .node-number {
          font-family: var(--font-headings);
          font-size: 1.8rem;
          font-weight: 900;
          color: rgba(255,255,255,0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          border: 2px solid rgba(255, 255, 255, 0.08);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .node-check {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 20px;
          height: 20px;
          background: var(--color-primary);
          border-radius: 50%;
          color: #fff;
          font-size: 10px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px var(--color-primary);
        }

        .roadmap-node:hover .node-number {
          border-color: var(--color-primary);
          background: linear-gradient(180deg, var(--color-primary), transparent);
          -webkit-background-clip: unset;
          -webkit-text-fill-color: #fff;
          color: #fff;
        }

        .node-completed.roadmap-node .node-number {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .node-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .node-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
        }

        .node-desc {
          color: var(--text-muted);
          font-size: 0.88rem;
          line-height: 1.4;
        }

        .node-status-tags {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }

        .node-arrow {
          color: var(--text-dim);
          transition: transform var(--transition-fast), color var(--transition-fast);
        }

        .roadmap-node:hover .node-arrow {
          transform: translateX(4px);
          color: #fff;
        }

        .sidebar-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .quote-card {
          padding: 24px;
          background: linear-gradient(135deg, rgba(21, 18, 38, 0.4), rgba(14, 11, 26, 0.6));
          border-style: dashed;
          border-color: rgba(212, 175, 55, 0.2);
          position: relative;
        }

        .quote-icon {
          position: absolute;
          top: 16px;
          right: 20px;
        }

        .quote-text {
          font-style: italic;
          color: var(--text-main);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .quote-author {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--color-accent-gold);
        }

        .author-title {
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        .drills-card {
          padding: 24px;
        }

        .drills-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
        }

        .card-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .drills-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .drill-item {
          display: flex;
          gap: 14px;
          padding: 16px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
          transition: var(--transition-fast);
        }

        .drill-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(212, 175, 55, 0.15);
        }

        .drill-completed {
          opacity: 0.65;
          background: rgba(46, 204, 113, 0.02);
          border-color: rgba(46, 204, 113, 0.15);
        }

        /* Checkbox Styling */
        .drill-checkbox-container {
          position: relative;
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: flex-start;
          margin-top: 2px;
        }

        .drill-checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          height: 20px;
          width: 20px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          display: block;
          transition: var(--transition-fast);
        }

        .drill-checkbox-container:hover input ~ .checkmark {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: var(--color-accent-gold);
        }

        .drill-checkbox-container input:checked ~ .checkmark {
          background-color: var(--color-radiant);
          border-color: var(--color-radiant);
          box-shadow: 0 0 8px var(--color-radiant-glow);
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }

        .drill-checkbox-container input:checked ~ .checkmark:after {
          display: block;
        }

        .drill-checkbox-container .checkmark:after {
          left: 7px;
          top: 3px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .drill-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .drill-category {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-accent-gold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .drill-title-text {
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
        }

        .drill-description-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .drill-target {
          font-size: 0.8rem;
          color: var(--text-main);
          margin-top: 6px;
          padding: 8px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          border-left: 2px solid var(--color-primary);
        }

        .trophies-card {
          padding: 24px;
        }

        .trophies-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
        }

        .trophy-badge-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
        }

        .trophy-unlocked {
          border-color: rgba(212, 175, 55, 0.2);
          background: linear-gradient(90deg, rgba(212, 175, 55, 0.03), transparent);
        }

        .trophy-unlocked .trophy-icon-container {
          background: rgba(212, 175, 55, 0.1);
          color: var(--color-accent-gold);
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
        }

        .trophy-unlocked .trophy-name {
          color: #fff;
        }

        .trophy-unlocked .trophy-status {
          color: var(--color-accent-gold);
          font-weight: 700;
        }

        .trophy-locked {
          opacity: 0.5;
        }

        .trophy-icon-container {
          padding: 10px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          color: var(--text-dim);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .trophy-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .trophy-desc {
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        .trophy-status {
          margin-left: auto;
          font-size: 0.75rem;
          color: var(--text-dim);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
