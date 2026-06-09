import { useState } from 'react';
import { 
  Swords, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles,
  Zap
} from 'lucide-react';

interface RecommendedHero {
  name: string;
  avatar: string;
  roleType: string;
  attribute: 'Strength' | 'Agility' | 'Intelligence' | 'Universal';
  innate: string;
  facet: string;
  startingItems: string[];
  coreItems: string[];
  laningGuide: string;
}

export default function HeroFinder() {
  const [playstyle, setPlaystyle] = useState<string>('adc');
  const [position, setPosition] = useState<string>('pos1');
  const [recommendations, setRecommendations] = useState<RecommendedHero[] | null>(null);

  const getAttributeBadge = (attr: string) => {
    switch (attr) {
      case 'Strength': return 'badge-dire'; // red
      case 'Agility': return 'badge-radiant'; // green
      case 'Intelligence': return 'badge-primary'; // purple
      default: return 'badge-gold'; // gold for universal
    }
  };

  const handleSearch = () => {
    // Recommendation engine mapping
    let heroes: RecommendedHero[] = [];

    if (playstyle === 'adc') {
      heroes = [
        {
          name: 'Sniper',
          avatar: '🎯',
          roleType: 'Ranged Physical Marksman',
          attribute: 'Agility',
          innate: 'Keen Eye (Passively increases attack range by up to +400 units).',
          facet: 'Scattershot (Shrapnel deals high burst damage and applies a heavy brief slow).',
          startingItems: ['Circlet', 'Slippers of Agility', 'Iron Branch', 'Tango'],
          coreItems: ['Power Treads', 'Hurricane Pike', 'Daedalus', 'Dragon Lance'],
          laningGuide: 'Position yourself far behind your creep wave. Use your extreme range to secure last hits and harass the enemy without drawing creep aggro. Do not cross the river alone.'
        },
        {
          name: 'Drow Ranger',
          avatar: '❄️',
          roleType: 'Ranged Anti-Carry Marksman',
          attribute: 'Agility',
          innate: 'Precision Aura (Passively grants bonus agility to nearby ranged heroes).',
          facet: 'Sidestep (Allows you to walk slowly while channeling your Multishot arrows).',
          startingItems: ['Slippers of Agility', 'Circlet', 'Iron Branch', 'Tango'],
          coreItems: ['Power Treads', 'Manta Style', 'Hurricane Pike', 'Butterfly'],
          laningGuide: 'Use Frost Arrows to harass the enemy offlaner. Frost arrows do not draw creep aggro when manually cast! Secure ranged creeps with Multishot if needed.'
        },
        {
          name: 'Luna',
          avatar: '🌙',
          roleType: 'AoE Physical Flash-Farmer',
          attribute: 'Agility',
          innate: 'Lunar Blessing (Grants bonus attack damage to all nearby allied heroes).',
          facet: 'Lunar Orbit (Glaives bounce and rotate around Luna, reducing damage received).',
          startingItems: ['Quelling Blade', 'Circlet', 'Iron Branch', 'Tango'],
          coreItems: ['Power Treads', 'Manta Style', 'Dragon Lance', 'Black King Bar'],
          laningGuide: 'Focus entirely on last-hitting. Once you reach Level 5 (Level 3 Moon Glaives), push your lane out and rotate to farm nearby jungle camps. You farm faster than almost anyone.'
        }
      ];
    } else if (playstyle === 'bruiser') {
      heroes = [
        {
          name: 'Axe',
          avatar: '🪓',
          roleType: 'Melee Aggressive Initiator',
          attribute: 'Strength',
          innate: 'Counter Helix (Chance to spin and deal pure damage when attacked by enemies).',
          facet: 'One Man Army (Increases Armor and Strength when no allies are within 600 units).',
          startingItems: ['Quelling Blade', 'Ring of Protection', 'Gauntlets of Strength', 'Tango'],
          coreItems: ['Phase Boots', 'Blink Dagger', 'Blade Mail', 'Vanguard'],
          laningGuide: 'Stand directly inside the enemy creep wave. Right-click the enemy hero to pull creep aggro. This forces them to attack you, triggering Counter Helix spins and shredding their health.'
        },
        {
          name: 'Centaur Warrunner',
          avatar: '🐎',
          roleType: 'Beefy Frontline Tank & Initiator',
          attribute: 'Strength',
          innate: 'Rawhide (Permanently increases maximum health by +35 HP every 2 minutes).',
          facet: 'Hit the Road (Stampede speeds up allies and allows you to hook cart-allies behind you).',
          startingItems: ['Quelling Blade', 'Bracer Component', 'Iron Branch', 'Tango'],
          coreItems: ['Phase Boots', 'Blink Dagger', 'Pipe of Insight', 'Crimson Guard'],
          laningGuide: 'Use Double Edge to secure last hits and trade damage. Double Edge costs health, so buy plenty of Ring of Health/Tango components early. Coordinate stuns with your soft support.'
        },
        {
          name: 'Bristleback',
          avatar: '🦔',
          roleType: 'Sustain Bruiser & Damage Soak',
          attribute: 'Strength',
          innate: 'Warpath (Spells cast increase movement speed and damage stack-by-stack).',
          facet: 'Berserk (Grants additional attack speed and spell lifesteal when falling low-HP).',
          startingItems: ['Quelling Blade', 'Ring of Regen', 'Iron Branch', 'Tango'],
          coreItems: ['Power Treads', 'Vanguard', 'Aghanim\'s Scepter', 'Kaya & Sange'],
          laningGuide: 'Turn your back to the enemy when they attack you! Your passive reduces damage from the rear. Spam Quill Spray to chip away at their health and force them out of the lane.'
        }
      ];
    } else if (playstyle === 'assassin') {
      heroes = [
        {
          name: 'Spirit Breaker',
          avatar: '🐂',
          roleType: 'Global Ganker & Space-Maker',
          attribute: 'Strength',
          innate: 'Charge of Darkness (Allows you to charge towards any enemy unit globally).',
          facet: 'Bull Rush (Increases your speed and damage output when charging from far away).',
          startingItems: ['Gauntlets of Strength', 'Wind Lace', 'Iron Branch', 'Tango'],
          coreItems: ['Phase Boots', 'Shadow Blade', 'Black King Bar', 'Octarine Core'],
          laningGuide: 'Trade hits using Greater Bash. Once you hit Level 3/4, look at the map. If the enemy midlaner is pushed, charge them from your lane to set up a cross-map kill.'
        },
        {
          name: 'Bounty Hunter',
          avatar: '💰',
          roleType: 'Invisible Gold-Stealer',
          attribute: 'Agility',
          innate: 'Jinada (Critical strike that steals gold from enemy heroes upon attack).',
          facet: 'Cutpurse (Steals 10 gold from enemy heroes whenever you target them with an item/spell).',
          startingItems: ['Quelling Blade', 'Orb of Venom', 'Iron Branch', 'Tango'],
          coreItems: ['Phase Boots', 'Drum of Endurance', 'Orchid Malevolence', 'Aghanim\'s Shard'],
          laningGuide: 'Hit the enemy hero with Jinada whenever it is off cooldown to steal their gold. Use Shadow Walk to become invisible, allowing you to scout and harass their support.'
        },
        {
          name: 'Phantom Assassin',
          avatar: '⚔️',
          roleType: 'Melee Burst Assassin',
          attribute: 'Agility',
          innate: 'Immaterial (Passively grants evasion against physical attacks, scaling with level).',
          facet: 'Methodical (Crits trigger on a fixed count of attacks rather than random chance).',
          startingItems: ['Quelling Blade', 'Slippers of Agility', 'Iron Branch', 'Tango'],
          coreItems: ['Power Treads', 'Battle Fury', 'Desolator', 'Black King Bar'],
          laningGuide: 'Use Stifling Dagger from safety to secure last hits. Use Phantom Strike to escape to friendly creeps if the enemy offlaner tries to dive or harass you.'
        }
      ];
    } else if (playstyle === 'mage') {
      heroes = [
        {
          name: 'Zeus',
          avatar: '⚡',
          roleType: 'Long-Range AoE Magic Nuker',
          attribute: 'Intelligence',
          innate: 'Static Field (Spells shock enemies, dealing a percentage of their current HP).',
          facet: 'Livewire (Static Field deals more damage the closer Zeus is to the target).',
          startingItems: ['Mantles of Intelligence', 'Circlet', 'Enchanted Mango', 'Tango'],
          coreItems: ['Arcane Boots', 'Aether Lens', 'Aghanim\'s Shard', 'Kaya & Sange'],
          laningGuide: 'Spam Arcane Lightning to secure last hits (especially ranged creeps) and harass the enemy. Keep your mana pool high using Clarities and Bottle-runes.'
        },
        {
          name: 'Lina',
          avatar: '🔥',
          roleType: 'Burst Magic / Right-Click Hybrid',
          attribute: 'Intelligence',
          innate: 'Fiery Soul (Spells cast grant stacking attack speed and movement speed).',
          facet: 'Thermal Runaway (Laguna Blade triggers maximum Fiery Soul stacks instantly).',
          startingItems: ['Circlet', 'Mantles of Intelligence', 'Fairy Fire', 'Tango'],
          coreItems: ['Power Treads', 'Eul\'s Scepter', 'Shadow Blade', 'Aghanim\'s Shard'],
          laningGuide: 'Line up Dragon Slave to hit both the enemy creeps and the enemy hero. Use Light Strike Array to stun them when they walk up to last-hit a creep.'
        },
        {
          name: 'Viper',
          avatar: '🐍',
          roleType: 'Lane-Dominating Magic Tank',
          attribute: 'Agility',
          innate: 'Corrosive Skin (Deals magic damage and slows anyone who attacks or spells Viper).',
          facet: 'Poison Attack (Spits poison that reduces enemy magic resistance and slows them).',
          startingItems: ['Circlet', 'Iron Branch', 'Enchanted Mango', 'Tango'],
          coreItems: ['Power Treads', 'Hurricane Pike', 'Manta Style', 'Black King Bar'],
          laningGuide: 'Viper is the strongest 1v1 laner. Manually cast Poison Attack on the enemy hero. Since it is a manual spell, it will not draw creep aggro. Walk them down and kill them.'
        }
      ];
    } else { // Support / Protector
      heroes = [
        {
          name: 'Crystal Maiden',
          avatar: '❄️',
          roleType: 'Crowd-Control & Global Mana Support',
          attribute: 'Intelligence',
          innate: 'Arcane Aura (Provides passive mana regeneration to all allies globally).',
          facet: 'Cold Front (Crystal Nova applies a stacking slow and frostbite buildup).',
          startingItems: ['Blood Grenade', 'Sentry Ward', 'Observer Ward', 'Tango', 'Clarity'],
          coreItems: ['Tranquil Boots', 'Glimmer Cape', 'Force Staff', 'Blink Dagger'],
          laningGuide: 'Use Crystal Nova to slow both lane opponents. If they position poorly, cast Frostbite on the carry and throw a Blood Grenade to secure an early first blood.'
        },
        {
          name: 'Witch Doctor',
          avatar: '🧪',
          roleType: 'High-Damage Teamfight Support',
          attribute: 'Intelligence',
          innate: 'Gris-Gris (A passive item that accumulates gold, scaling with deaths).',
          facet: 'Voodoo Fester (Voodoo Restoration heals allies but also damages nearby enemies).',
          startingItems: ['Blood Grenade', 'Circlet', 'Iron Branch', 'Tango', 'Mango'],
          coreItems: ['Arcane Boots', 'Glimmer Cape', 'Aghanim\'s Shard', 'Aghanim\'s Scepter'],
          laningGuide: 'Harass enemies with auto-attacks. When they clump near their creep wave, throw Paralyzing Cask (the stun will bounce between them). Apply Maledict for guaranteed kill damage.'
        },
        {
          name: 'Lion',
          avatar: '🦁',
          roleType: 'Disabling & Burst Support',
          attribute: 'Intelligence',
          innate: 'To Hell and Back (Finger of Death increases damage permanently with each hero kill).',
          facet: 'Essence Eater (Mana Drain deals damage equal to the mana stolen from the enemy).',
          startingItems: ['Sentry Ward', 'Blood Grenade', 'Circlet', 'Tango'],
          coreItems: ['Tranquil Boots', 'Blink Dagger', 'Glimmer Cape', 'Aether Lens'],
          laningGuide: 'Use Mana Drain on the enemy support to leave them with zero spells. Stun with Earth Spike and hex them with Hex. When you hit level 6, coordinate a burst kill.'
        }
      ];
    }

    setRecommendations(heroes);
  };

  return (
    <div className="hero-finder-container animate-fade-in">
      <div className="finder-header glass-card">
        <h1 className="page-title"><Swords size={24} color="#d4af37" style={{ marginRight: '8px' }} /> MOBA Hero Finder</h1>
        <p className="page-subtitle">Select your previous MOBA playstyle and desired team position to discover your Dota 2 hero matches.</p>
      </div>

      <div className="finder-form glass-card">
        <div className="grid-2">
          {/* Playstyle Select */}
          <div className="input-group">
            <span className="input-label">My MOBA Comfort Playstyle</span>
            <select 
              className="form-select" 
              value={playstyle} 
              onChange={(e) => setPlaystyle(e.target.value)}
            >
              <option value="adc">ADC / Marksman (Ranged Carry)</option>
              <option value="bruiser">Bruiser / Fighter (Melee Frontline/Tank)</option>
              <option value="assassin">Assassin / Flanker (Burst/Ganking)</option>
              <option value="mage">Mage / Spellcaster (AoE Magic/Nuke)</option>
              <option value="support">Enchanter / Support (Healer/Disabler)</option>
            </select>
          </div>

          {/* Position Select */}
          <div className="input-group">
            <span className="input-label">Dota 2 Farm Priority (Position)</span>
            <select 
              className="form-select" 
              value={position} 
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="pos1">Position 1: Hard Carry (Safe Lane Farmer)</option>
              <option value="pos2">Position 2: Midlaner (Solo Tempo Creator)</option>
              <option value="pos3">Position 3: Offlaner (Initiator/Tank)</option>
              <option value="pos4">Position 4: Soft Support (Roaming Utility)</option>
              <option value="pos5">Position 5: Hard Support (Babysitter/Warder)</option>
            </select>
          </div>
        </div>

        <button className="btn btn-gold btn-block" onClick={handleSearch}>
          Match My Heroes <ArrowRight size={16} />
        </button>
      </div>

      {/* Recommendations Cards */}
      {recommendations && (
        <div className="recommendations-row animate-fade-in">
          <h2 className="results-title"><Sparkles size={18} color="var(--color-accent-gold)" /> Recommended Starter Picks</h2>
          <div className="grid-3">
            {recommendations.map((hero, index) => (
              <div key={index} className="hero-rec-card glass-card">
                <div className="hero-avatar-row">
                  <div className="hero-avatar">{hero.avatar}</div>
                  <div>
                    <h3 className="hero-name-label">{hero.name}</h3>
                    <span className={`badge ${getAttributeBadge(hero.attribute)}`}>
                      {hero.attribute}
                    </span>
                  </div>
                </div>

                <div className="rec-details">
                  <div className="rec-section">
                    <span className="rec-subtitle">Archetype Role</span>
                    <p className="rec-val">{hero.roleType}</p>
                  </div>

                  <div className="rec-section">
                    <span className="rec-subtitle">Innate Ability (7.36)</span>
                    <p className="rec-val">{hero.innate}</p>
                  </div>

                  <div className="rec-section">
                    <span className="rec-subtitle">Recommended Facet (7.36)</span>
                    <p className="rec-val">{hero.facet}</p>
                  </div>

                  <div className="rec-section border-top-light">
                    <span className="rec-subtitle"><ShoppingBag size={12} /> Starting Items</span>
                    <div className="items-list">
                      {hero.startingItems.map((item, idx) => (
                        <span key={idx} className="item-tag badge-secondary">{item}</span>
                      ))}
                    </div>
                  </div>

                  <div className="rec-section">
                    <span className="rec-subtitle"><ShoppingBag size={12} /> Suggested Core Items</span>
                    <div className="items-list">
                      {hero.coreItems.map((item, idx) => (
                        <span key={idx} className="item-tag badge-primary">{item}</span>
                      ))}
                    </div>
                  </div>

                  <div className="rec-section pro-guide-section">
                    <span className="rec-subtitle text-gold"><Zap size={12} /> Laning Guideline</span>
                    <p className="rec-val guide-text">{hero.laningGuide}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .hero-finder-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .finder-header {
          padding: 24px;
        }

        .finder-form {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .btn-block {
          width: 100%;
          justify-content: center;
          margin-top: 12px;
        }

        .results-title {
          font-size: 1.35rem;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 8px;
        }

        .hero-rec-card {
          padding: 24px;
          background: rgba(21, 18, 38, 0.7);
        }

        .hero-rec-card:hover {
          border-color: var(--color-accent-gold);
          box-shadow: var(--shadow-gold);
        }

        .hero-avatar-row {
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 16px;
          margin-bottom: 16px;
        }

        .hero-avatar {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
        }

        .hero-name-label {
          font-size: 1.25rem;
          color: #fff;
          line-height: 1.2;
        }

        .rec-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rec-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .border-top-light {
          border-top: 1px solid var(--border-light);
          padding-top: 12px;
        }

        .rec-subtitle {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .rec-val {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .items-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .item-tag {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-light);
          color: var(--text-main);
        }

        .pro-guide-section {
          background: rgba(212, 175, 55, 0.03);
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 6px;
          padding: 12px;
          margin-top: 4px;
        }

        .guide-text {
          color: var(--text-main);
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
