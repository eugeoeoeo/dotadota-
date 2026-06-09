import { useState } from 'react';
import { 
  Compass, 
  Clock, 
  Sword, 
  Shield, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface MapNode {
  id: string;
  name: string;
  category: 'roshan' | 'twingate' | 'tormentor' | 'lotus' | 'wisdom' | 'outpost';
  top: string; // Percentages for map positioning
  left: string;
  spawnTime: string;
  timerInterval: string;
  description: string;
  mechanics: string[];
  proTips: string[];
}

export default function InteractiveMap() {
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const nodes: MapNode[] = [
    {
      id: 'rosh-dire',
      name: 'Roshan Pit (Dire - Night Pit)',
      category: 'roshan',
      top: '7%',
      left: '9%',
      spawnTime: '0:00 (Starts Day 1)',
      timerInterval: '8 to 11 minutes (Randomized after death)',
      description: 'Roshan resides in the top-left pit during the night. He will channel a portal and walk to this pit using the Twin Gates when night falls (at 5:00, 15:00, 25:00, etc.).',
      mechanics: [
        'Aegis of the Immortal is always dropped.',
        'On 2nd death onwards: drops Aegis + Cheese (Dire pit) or Aegis + Roshan\'s Banner (Radiant pit).',
        'On 3rd death onwards: drops Refresher Shard (Dire pit) or Aghanim\'s Scepter (Radiant pit).',
        'Armor increases by 1.25 and HP increases by 130 every minute.'
      ],
      proTips: [
        'Always secure the Watcher near the pit before attempting Roshan to prevent enemies from stealing Aegis.',
        'Roshan has high magic resistance. Use physical minus-armor abilities (like Slardar\'s Corrosive Haze or Templar Assassin\'s Meld) to kill him twice as fast.'
      ]
    },
    {
      id: 'rosh-radiant',
      name: 'Roshan Pit (Radiant - Day Pit)',
      category: 'roshan',
      top: '93%',
      left: '91%',
      spawnTime: '0:00 (Starts Day 1)',
      timerInterval: '8 to 11 minutes (Randomized after death)',
      description: 'Roshan resides in this bottom-right pit during the day. He will walk back to this pit at sunrise (at 0:00, 10:00, 20:00, etc.) if he is alive.',
      mechanics: [
        'Aegis of the Immortal is always dropped.',
        'On 2nd death: drops Aegis + Roshan\'s Banner (Radiant pit). Banner can be placed in a lane to grant nearby creeps +75% HP and +50% damage.',
        'On 3rd death: drops Aegis + Aghanim\'s Scepter (Radiant pit). Fully upgrades a hero\'s ability.',
        'Roshan\'s Roar of Retribution deals area damage and applies a 20% damage amp debuff if he is attacked by the team that killed him last.'
      ],
      proTips: [
        'The Radiant pit is very close to the Radiant Offlane/Dire Safelane, making it easy for Dire to contest during the day.',
        'Place Roshan\'s Banner in the lane opposite to where you want to play. For example, if you want to push top, place the banner bottom to create double lane pressure.'
      ]
    },
    {
      id: 'gate-dire',
      name: 'Twin Gate (Top-Left)',
      category: 'twingate',
      top: '3%',
      left: '16%',
      spawnTime: '0:00',
      timerInterval: 'Always Active (3-second channel time)',
      description: 'A mystical portal connecting the top-left and bottom-right corners of the map. Channeling for 3 seconds teleports the user directly to the opposite gate.',
      mechanics: [
        'Costs 75 Mana to use.',
        'Can be channeled by any hero, including illusions and controlled units.',
        'Taking damage during channeling cancels the teleport.'
      ],
      proTips: [
        'Excellent for offlane supports to rotate instantly to the safelane for a surprise gank without wasting a Town Portal Scroll.',
        'If being chased near the map corners, run to the gate, start channeling, and use a disable/juke to teleport away before they can cancel it.'
      ]
    },
    {
      id: 'gate-radiant',
      name: 'Twin Gate (Bottom-Right)',
      category: 'twingate',
      top: '97%',
      left: '84%',
      spawnTime: '0:00',
      timerInterval: 'Always Active (3-second channel time)',
      description: 'A mystical portal connecting the bottom-right and top-left corners of the map. Channeling for 3 seconds teleports the user directly to the opposite gate.',
      mechanics: [
        'Costs 75 Mana to use.',
        'Gives vision around the exit gate upon arrival.',
        'Can be used to quickly reposition the team after taking Roshan or securing lanes.'
      ],
      proTips: [
        'Be careful: enemies can ward the exit area of the gate. Check for sentry wards or send an illusion through first if you suspect an ambush.'
      ]
    },
    {
      id: 'torment-dire',
      name: 'Tormentor (Dire Offlane)',
      category: 'tormentor',
      top: '25%',
      left: '14%',
      spawnTime: '20:00',
      timerInterval: 'Respawns 10 minutes after death (grows stronger)',
      description: 'A powerful mini-boss that spawns near the Dire Tier 2 Offlane tower. It does not attack but reflects damage.',
      mechanics: [
        'Has 2500 shield that regenerates rapidly and 1 HP.',
        'Reflects 70% of all damage received back to all heroes within a 1200 radius.',
        'Defeating it awards an Aghanim\'s Shard to one of the two lowest-net-worth players on your team who doesn\'t already have one.',
        'Each respawn increases its shield regeneration and reflected damage percentage.'
      ],
      proTips: [
        'Never hit the Tormentor alone! The reflected damage is shared among nearby heroes. Group up with 3-4 teammates to split the damage and kill it safely in 5 seconds.',
        'Heroes with lifesteal, heavy damage block, or shields (like Abaddon or Wraith King) can tank the reflection much easier.'
      ]
    },
    {
      id: 'torment-radiant',
      name: 'Tormentor (Radiant Offlane)',
      category: 'tormentor',
      top: '75%',
      left: '86%',
      spawnTime: '20:00',
      timerInterval: 'Respawns 10 minutes after death (grows stronger)',
      description: 'A powerful mini-boss that spawns near the Radiant Tier 2 Offlane tower. It does not attack but reflects damage.',
      mechanics: [
        'Reflects 70% damage as unmitigated physical and magical damage.',
        'Provides 250 gold/XP to the killer if all 5 teammates already have Shards.',
        'Spawns inside a high-ground alcove that is easy to defend from invaders.'
      ],
      proTips: [
        'If your support is close to a key Aghanim\'s Shard upgrade (e.g., Witch Doctor\'s Voodoo Switcheroo), coordinate a team rotation to kill the Tormentor at exactly 20:00.'
      ]
    },
    {
      id: 'lotus-dire',
      name: 'Lotus Pool (Top-Left River)',
      category: 'lotus',
      top: '44%',
      left: '18%',
      spawnTime: '3:00',
      timerInterval: 'Spawns 1 Healing Lotus every 3 minutes (max 6)',
      description: 'Located in the river near the top lane. Channeling for a brief period collects Healing Lotuses.',
      mechanics: [
        '1 Healing Lotus restores 125 HP and 125 Mana.',
        'Three Healing Lotuses automatically combine in your inventory into a Great Healing Lotus (restores 400 HP/Mana).',
        'Two Great Lotuses combine into a Greater Lotus (restores 900 HP/Mana), which can be further combined into Cheese.'
      ],
      proTips: [
        'Always contest the Lotus Pools at 3:00 and 6:00. In the laning phase, a free 125 HP/Mana pop is equivalent to a free Tango/Mango, allowing you to sustain the lane without buying courier regen.',
        'If your inventory is full, the Lotus will drop on the ground. Be careful, as enemies can pick it up!'
      ]
    },
    {
      id: 'lotus-radiant',
      name: 'Lotus Pool (Bottom-Right River)',
      category: 'lotus',
      top: '56%',
      left: '82%',
      spawnTime: '3:00',
      timerInterval: 'Spawns 1 Healing Lotus every 3 minutes (max 6)',
      description: 'Located in the river near the bottom lane. Channeling for a brief period collects Healing Lotuses.',
      mechanics: [
        'Can be channeled by supports or carries.',
        'The pools can hold a maximum of 6 Lotuses. Once full, they stop spawning new ones. Keep them harvested!'
      ],
      proTips: [
        'In the late-game, saving a stack of Lotuses and combining them into Cheese can be a game-winning burst heal in a teamfight.'
      ]
    },
    {
      id: 'wisdom-dire',
      name: 'Wisdom Rune (Dire Base Outer)',
      category: 'wisdom',
      top: '19%',
      left: '73%',
      spawnTime: '7:00',
      timerInterval: 'Spawns every 7 minutes (7:00, 14:00, 21:00...)',
      description: 'A special experience rune located on the top edge of the map, just outside the Dire base.',
      mechanics: [
        'Grants a massive chunk of Experience (+280 XP, scaling up by +280 each spawn interval).',
        'Grants experience to the hero who gathers it, and a secondary chunk to the lowest-level hero on the team.'
      ],
      proTips: [
        'As an offlane support (Pos 4), look at the timer at 6:40. You should start walking toward the enemy\'s Wisdom Rune to steal it at 7:00, while your Pos 5 support secures your own. Stealing a Wisdom Rune guarantees a massive level advantage.'
      ]
    },
    {
      id: 'wisdom-radiant',
      name: 'Wisdom Rune (Radiant Base Outer)',
      category: 'wisdom',
      top: '81%',
      left: '27%',
      spawnTime: '7:00',
      timerInterval: 'Spawns every 7 minutes (7:00, 14:00, 21:00...)',
      description: 'A special experience rune located on the bottom edge of the map, just outside the Radiant base.',
      mechanics: [
        'Provides scaling experience.',
        'Crucial for supports (Pos 4/5) to reach Level 6 and unlock their game-changing ultimates.'
      ],
      proTips: [
        'Protect your Wisdom Rune! If the enemy support is missing around 6:50, stand on the rune spot to secure it the millisecond it spawns.'
      ]
    },
    {
      id: 'outpost-radiant',
      name: 'Radiant Outpost (Jungle)',
      category: 'outpost',
      top: '68%',
      left: '42%',
      spawnTime: '0:00',
      timerInterval: 'Controlled by Radiant, can be captured by Dire after Tier 2 towers fall.',
      description: 'A captureable structure located in the Radiant main jungle.',
      mechanics: [
        'Allows teammates to teleport to it (Town Portal Scroll channel time is reduced to 4 seconds).',
        'Grants 500-radius True Sight (reveals invisible units) and vision around it.',
        'Cannot be captured by the enemy until one of the team\'s Tier 2 towers is destroyed.'
      ],
      proTips: [
        'Use the Outpost as a defensive anchor when farming your jungle. If enemies invade, your teammates can TP directly onto the Outpost to counter-gank.'
      ]
    },
    {
      id: 'outpost-dire',
      name: 'Dire Outpost (Jungle)',
      category: 'outpost',
      top: '32%',
      left: '58%',
      spawnTime: '0:00',
      timerInterval: 'Controlled by Dire, can be captured by Radiant after Tier 2 towers fall.',
      description: 'A captureable structure located in the Dire main jungle.',
      mechanics: [
        'Allows teleports and grants True Sight.',
        'Capturing the enemy Outpost denies them a crucial teleportation node, locking them inside their base.'
      ],
      proTips: [
        'If you destroy the enemy Tier 2 tower, immediately march to their Outpost and right-click to capture it. This locks down their jungle territory.'
      ]
    }
  ];

  const filteredNodes = activeFilter === 'all' 
    ? nodes 
    : nodes.filter(node => node.category === activeFilter);

  const getMarkerColor = (category: string) => {
    switch (category) {
      case 'roshan': return 'marker-roshan';
      case 'twingate': return 'marker-gate';
      case 'tormentor': return 'marker-tormentor';
      case 'lotus': return 'marker-lotus';
      case 'wisdom': return 'marker-wisdom';
      case 'outpost': return 'marker-outpost';
      default: return '';
    }
  };

  return (
    <div className="map-view-container animate-fade-in">
      <div className="map-header glass-card">
        <div>
          <h1 className="page-title"><Compass size={24} color="#d4af37" style={{ marginRight: '8px' }} /> Strategic Map Objectives</h1>
          <p className="page-subtitle">Learn the timers, mechanics, and coordinates of the expanded 7.33+ Dota 2 map. Click any marker to inspect.</p>
        </div>
        
        {/* Filters */}
        <div className="map-filters">
          {['all', 'roshan', 'twingate', 'tormentor', 'lotus', 'wisdom', 'outpost'].map(filter => (
            <button
              key={filter}
              className={`filter-badge ${activeFilter === filter ? 'filter-active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="map-layout-grid">
        {/* Interactive Map Graphic */}
        <div className="map-graphic-card glass-card">
          <div className="map-wrapper">
            {/* The Stylized Map Grid */}
            <svg className="map-svg-grid" viewBox="0 0 500 500">
              {/* Radiant Territory Background (Bottom-Left) */}
              <path d="M 0 0 L 0 500 L 500 500 Z" fill="rgba(46, 204, 113, 0.04)" />
              
              {/* Dire Territory Background (Top-Right) */}
              <path d="M 0 0 L 500 0 L 500 500 Z" fill="rgba(231, 76, 60, 0.04)" />
              
              {/* River Diagonal Line */}
              <line x1="0" y1="500" x2="500" y2="0" stroke="rgba(52, 152, 219, 0.4)" strokeWidth="8" strokeDasharray="5,5" />
              
              {/* Outer lanes */}
              {/* Top/Right Lane */}
              <path d="M 50 450 L 50 50 L 450 50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              {/* Mid Lane */}
              <line x1="50" y1="450" x2="450" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              {/* Bottom/Right Lane */}
              <path d="M 50 450 L 450 450 L 450 50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />

              {/* Radiant Base */}
              <rect x="25" y="425" width="50" height="50" rx="8" fill="rgba(46, 204, 113, 0.15)" stroke="var(--color-radiant)" strokeWidth="2" />
              <text x="50" y="455" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">RADIANT</text>
              
              {/* Dire Base */}
              <rect x="425" y="25" width="50" height="50" rx="8" fill="rgba(231, 76, 60, 0.15)" stroke="var(--color-dire)" strokeWidth="2" />
              <text x="450" y="55" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">DIRE</text>
            </svg>

            {/* Interactive Nodes */}
            {filteredNodes.map(node => (
              <button
                key={node.id}
                className={`map-node-marker ${getMarkerColor(node.category)} ${selectedNode?.id === node.id ? 'marker-selected' : ''}`}
                style={{ top: node.top, left: node.left }}
                onClick={() => setSelectedNode(node)}
                aria-label={node.name}
              >
                <span className="marker-inner" />
              </button>
            ))}
          </div>
        </div>

        {/* Inspector Sidebar */}
        <div className="inspector-card-column">
          {selectedNode ? (
            <div className="inspector-panel glass-card animate-fade-in" key={selectedNode.id}>
              <div className="inspector-header">
                <span className={`badge badge-${selectedNode.category === 'roshan' ? 'gold' : selectedNode.category === 'tormentor' ? 'dire' : 'primary'}`}>
                  {selectedNode.category}
                </span>
                <h2 className="inspector-title">{selectedNode.name}</h2>
              </div>
              
              <div className="inspector-quick-stats">
                <div className="stat-box">
                  <Clock size={16} color="var(--color-accent-gold)" />
                  <div>
                    <span className="stat-label">Spawn Time</span>
                    <span className="stat-val">{selectedNode.spawnTime}</span>
                  </div>
                </div>
                
                <div className="stat-box">
                  <Calendar size={16} color="var(--color-primary)" />
                  <div>
                    <span className="stat-label">Interval / Cycle</span>
                    <span className="stat-val">{selectedNode.timerInterval}</span>
                  </div>
                </div>
              </div>

              <div className="inspector-section">
                <h4 className="section-subtitle">Objective Description</h4>
                <p className="inspector-desc">{selectedNode.description}</p>
              </div>

              <div className="inspector-section">
                <h4 className="section-subtitle"><Shield size={14} style={{ marginRight: '6px' }} /> Key Mechanics</h4>
                <ul className="inspector-list">
                  {selectedNode.mechanics.map((mech, index) => (
                    <li key={index}>{mech}</li>
                  ))}
                </ul>
              </div>

              <div className="inspector-section pro-section">
                <h4 className="section-subtitle text-gold"><Sword size={14} style={{ marginRight: '6px' }} /> Pro Strategic Tips</h4>
                <ul className="inspector-list pro-list">
                  {selectedNode.proTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="inspector-empty glass-card">
              <AlertCircle size={40} className="empty-icon animate-pulse" />
              <h3>Select an Objective Node</h3>
              <p>Click on any of the flashing markers on the tactical map grid to inspect spawn timers, reward drops, damage scaling, and professional movement guidelines.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .map-view-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .map-header {
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-title {
          font-size: 1.8rem;
          font-weight: 850;
          display: flex;
          align-items: center;
        }

        .page-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .map-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-badge {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-light);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          transition: var(--transition-fast);
        }

        .filter-badge:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }

        .filter-active {
          background: var(--color-primary) !important;
          color: #fff !important;
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 10px var(--color-primary-glow);
        }

        .map-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 992px) {
          .map-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        .map-graphic-card {
          padding: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(10, 8, 20, 0.4);
        }

        .map-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 1 / 1;
          background: #090710;
          border: 2px solid var(--border-light);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
        }

        .map-svg-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        /* Marker Styles */
        .map-node-marker {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          z-index: 10;
          cursor: pointer;
        }

        .marker-inner {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: block;
          transition: transform var(--transition-fast);
        }

        .map-node-marker:hover .marker-inner {
          transform: scale(1.4);
        }

        /* Flashing Glow effect */
        @keyframes markerGlow {
          0% { box-shadow: 0 0 0 0px var(--glow-color); }
          70% { box-shadow: 0 0 0 8px var(--glow-color-transparent); }
          100% { box-shadow: 0 0 0 0px var(--glow-color-transparent); }
        }

        .map-node-marker {
          animation: markerGlow 2s infinite;
        }

        .marker-roshan {
          --glow-color: rgba(212, 175, 55, 0.6);
          --glow-color-transparent: rgba(212, 175, 55, 0);
        }
        .marker-roshan .marker-inner { background: var(--color-accent-gold); }

        .marker-gate {
          --glow-color: rgba(52, 152, 219, 0.6);
          --glow-color-transparent: rgba(52, 152, 219, 0);
        }
        .marker-gate .marker-inner { background: #3498db; }

        .marker-tormentor {
          --glow-color: rgba(231, 76, 60, 0.6);
          --glow-color-transparent: rgba(231, 76, 60, 0);
        }
        .marker-tormentor .marker-inner { background: var(--color-dire); }

        .marker-lotus {
          --glow-color: rgba(46, 204, 113, 0.6);
          --glow-color-transparent: rgba(46, 204, 113, 0);
        }
        .marker-lotus .marker-inner { background: var(--color-radiant); }

        .marker-wisdom {
          --glow-color: rgba(142, 68, 173, 0.6);
          --glow-color-transparent: rgba(142, 68, 173, 0);
        }
        .marker-wisdom .marker-inner { background: var(--color-primary); }

        .marker-outpost {
          --glow-color: rgba(243, 156, 18, 0.6);
          --glow-color-transparent: rgba(243, 156, 18, 0);
        }
        .marker-outpost .marker-inner { background: #f39c12; }

        .marker-selected .marker-inner {
          transform: scale(1.5);
          box-shadow: 0 0 12px #fff !important;
          border: 2px solid #fff;
        }

        /* Inspector panel style */
        .inspector-panel {
          padding: 32px;
          background: rgba(21, 18, 38, 0.8);
          border-color: rgba(142, 68, 173, 0.15);
        }

        .inspector-header {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 16px;
          margin-bottom: 20px;
        }

        .inspector-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .inspector-quick-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        @media (max-width: 480px) {
          .inspector-quick-stats {
            grid-template-columns: 1fr;
          }
        }

        .stat-box {
          background: rgba(0,0,0,0.2);
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-dim);
          display: block;
          text-transform: uppercase;
          font-weight: 600;
        }

        .stat-val {
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
        }

        .inspector-section {
          margin-bottom: 20px;
        }

        .section-subtitle {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }

        .text-gold {
          color: var(--color-accent-gold);
        }

        .inspector-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .inspector-list {
          padding-left: 20px;
        }

        .inspector-list li {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 6px;
          line-height: 1.5;
        }

        .pro-section {
          background: rgba(212, 175, 55, 0.03);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 8px;
          padding: 16px;
        }

        .pro-list li {
          color: var(--text-main);
        }

        .inspector-empty {
          padding: 48px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          min-height: 400px;
          background: rgba(21, 18, 38, 0.4);
        }

        .empty-icon {
          color: var(--text-dim);
        }

        .inspector-empty h3 {
          font-size: 1.25rem;
          color: #fff;
        }

        .inspector-empty p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 320px;
        }
      `}</style>
    </div>
  );
}
