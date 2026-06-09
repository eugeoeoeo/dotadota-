import { useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Info, 
  ShieldAlert, 
  Compass, 
  CheckCircle
} from 'lucide-react';

interface ModuleContentProps {
  selectedModule: number;
  setSelectedModule: (index: number) => void;
  progress: {
    modulesCompleted: boolean[];
    quizzesPassed: boolean[];
  };
  setModulesCompleted: (completed: boolean[]) => void;
  setActiveTab: (tab: string) => void;
}

export default function ModuleContent({ 
  selectedModule, 
  setSelectedModule, 
  progress, 
  setModulesCompleted,
  setActiveTab
}: ModuleContentProps) {

  // Auto-mark module as read when they load it
  useEffect(() => {
    if (!progress.modulesCompleted[selectedModule]) {
      const updated = [...progress.modulesCompleted];
      updated[selectedModule] = true;
      setModulesCompleted(updated);
    }
  }, [selectedModule, progress.modulesCompleted, setModulesCompleted]);

  const handleNext = () => {
    if (selectedModule < 5) {
      setSelectedModule(selectedModule + 1);
      window.scrollTo(0, 0);
    } else {
      setActiveTab('quizzes');
    }
  };

  const handlePrev = () => {
    if (selectedModule > 0) {
      setSelectedModule(selectedModule - 1);
      window.scrollTo(0, 0);
    }
  };

  const modulesData = [
    {
      title: "Module 1: The Core Fundamentals",
      subtitle: "Map Layout, Positions 1-5, Gold & XP, Innate Abilities & Facets",
      description: "Dota 2 differs drastically from other MOBAs due to its asymmetric design, active mechanics, and unique systems. Let's break down the core foundations.",
      content: (
        <div className="module-markdown">
          <h3>1. The Asymmetric Dota 2 Map</h3>
          <p>
            Unlike League of Legends or Mobile Legends, the Dota 2 map is not mirrored. It is divided diagonally by a river into two distinct faction territories:
          </p>
          <ul>
            <li><strong>The Radiant (Bottom-Left):</strong> A lush, green sanctuary. The Radiant jungle is generally considered easier to defend, and their safe lane runs along the bottom edge of the map.</li>
            <li><strong>The Dire (Top-Right):</strong> A barren, dark wasteland. The Dire jungle contains different high-ground choke points, and their safe lane runs along the top edge of the map.</li>
          </ul>
          
          <div className="info-box">
            <h5><Compass size={16} /> Safe Lane vs. Off Lane</h5>
            <p>
              In Dota 2, your lanes are asymmetric:
              <br />
              - **Safe Lane:** The lane where your creep wave meets closest to your Tier 1 tower (Bottom for Radiant, Top for Dire).
              <br />
              - **Off Lane:** The lane where your creep wave meets furthest from your tower, near the enemy's safe lane (Top for Radiant, Bottom for Dire).
            </p>
          </div>

          <h3>2. The Five Positions (Roles 1-5)</h3>
          <p>
            In Dota 2, roles are categorized by farm priority from 1 (highest) to 5 (lowest):
          </p>
          <div className="roles-grid">
            <div className="role-card glass-card">
              <span className="role-num">1</span>
              <h4>Hard Carry (Position 1)</h4>
              <p>Lanes in the Safe Lane with the Position 5 support. Weak early on, but scales exponentially with items. Primary source of physical damage and tower siege late-game.</p>
              <div className="role-examples"><strong>Examples:</strong> Anti-Mage, Faceless Void, Terrorblade</div>
            </div>
            
            <div className="role-card glass-card">
              <span className="role-num">2</span>
              <h4>Midlaner (Position 2)</h4>
              <p>Plays solo in the Mid Lane. Reaches Level 6 first. Responsible for controlling the tempo, making early map rotations, and creating space for the Position 1.</p>
              <div className="role-examples"><strong>Examples:</strong> Storm Spirit, Puck, Templar Assassin</div>
            </div>

            <div className="role-card glass-card">
              <span className="role-num">3</span>
              <h4>Offlaner (Position 3)</h4>
              <p>Lanes in the Off Lane. Usually a durable utility tank or initiator. Goal is to shut down the enemy Carry, absorb pressure, and start teamfights.</p>
              <div className="role-examples"><strong>Examples:</strong> Axe, Centaur Warrunner, Mars</div>
            </div>

            <div className="role-card glass-card">
              <span className="role-num">4</span>
              <h4>Soft Support (Position 4)</h4>
              <p>Lanes in the Off Lane with the Position 3. Focuses on roaming, contesting runes, setting up ganks, and purchasing utility/disabling items.</p>
              <div className="role-examples"><strong>Examples:</strong> Earthshaker, Rubick, Hoodwink</div>
            </div>

            <div className="role-card glass-card">
              <span className="role-num">5</span>
              <h4>Hard Support (Position 5)</h4>
              <p>Lanes in the Safe Lane to protect the Carry. Purchases wards, stacks camps, heals, and sacrifices their own game state so the Carry can farm safely.</p>
              <div className="role-examples"><strong>Examples:</strong> Crystal Maiden, Witch Doctor, Oracle</div>
            </div>
          </div>

          <h3>3. Creeps, Gold & Experience</h3>
          <p>
            Dota 2's economy revolves around extracting value from creep waves and neutrals while denying it to the enemy.
          </p>
          <ul>
            <li><strong>Creep Denying:</strong> When an allied creep is below 50% HP, you can attack it to "deny" it. This cuts the enemy's experience gained from that creep by 50% (75% for melee, 40% for ranged, etc.) and completely denies them the gold. <em>This is the single most important mechanic that separates Dota from other MOBAs.</em></li>
            <li><strong>Gold Distribution:</strong> Gold is split into **Reliable Gold** (gained from hero kills, Roshan, and global objectives) and **Unreliable Gold** (passive gold and neutral creeps). When you die, you lose a portion of your Unreliable Gold, but Reliable Gold remains untouched.</li>
            <li><strong>Buybacks:</strong> You can spend a portion of your gold to respawn instantly at the fountain. Use this carefully, as it has an 8-minute cooldown and a high gold cost.</li>
          </ul>

          <div className="pro-tip-box">
            <h5><Award size={16} /> Pro-Tip: Check Net Worth</h5>
            <p>
              In Dota 2, scoreboard gold is hidden, but you can track your net worth (total gold value of items + current gold) in the shop. Keep an eye on the enemy item progression. If an enemy carry completes an item like Battle Fury or Radiance, they will transition to jungle farming, meaning your team should prepare to invade their territory.
            </p>
          </div>

          <h3>4. Patch 7.36: Innate Abilities & Hero Facets</h3>
          <p>
            Patch 7.36 introduced two revolutionary systems that add deeper draft customization:
          </p>
          <ul>
            <li><strong>Innate Abilities:</strong> Every hero has a passive ability that is active from the very beginning of the match (at level 0). For example, Kunkka starts with Tidebringer available, and Dawnbreaker automatically reveals the map during daybreak.</li>
            <li><strong>Hero Facets:</strong> During the drafting/strategy phase, players select a "facet" for their hero. This modifies abilities or stats to fit specific game situations. For example, Wraith King can choose between a facet that spawns skeletons to push lanes, or a facet that grants crit damage.</li>
          </ul>
          
          <div className="mechanic-warning-box">
            <h5><ShieldAlert size={16} /> Strategic Facet Choice</h5>
            <p>
              Do not select facets blindly! Look at the draft. If your team lacks lane push, select push-oriented facets. If the enemy has heavy single-target burst, select facets that grant defensive survivability or mobility.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Module 2: Laning Stage Excellence",
      subtitle: "Last Hitting/Denying, Creep Aggro, Pulling & Stacking, Trading Regen",
      description: "The laning phase determines the first 10-15 minutes of the game. A pro player can win a match purely by dominating the lane through mechanics.",
      content: (
        <div className="module-markdown">
          <h3>1. Advanced Last Hitting & Denying</h3>
          <p>
            Farming in Dota 2 requires understanding animation frames, turn rates, and base attack time:
          </p>
          <ul>
            <li><strong>Attack Animation/Point:</strong> Each hero has a delay between when they start their attack command and when the damage is applied. Fast animation heroes (like Juggernaut) are easier to last-hit with than slow ones (like Clinkz).</li>
            <li><strong>Quelling Blade:</strong> Always buy this on melee carry/offlane heroes. It grants bonus damage against non-hero units, making last hitting under tower significantly easier.</li>
            <li><strong>Spell Securing:</strong> Do not hesitate to use spells to secure the ranged creep. The ranged creep grants the most XP and gold in the wave. Secure it before the enemy can deny it.</li>
          </ul>

          <h3>2. Creep Aggro Manipulation</h3>
          <p>
            Creep aggro is a tool that allows you to reposition the lane in your favor. Here is exactly how it works:
          </p>
          <div className="info-box">
            <h5><Info size={16} /> How to Pull Aggro</h5>
            <ol>
              <li>Stand within **500 units** of the enemy creeps.</li>
              <li>Right-click (attack command) an enemy hero anywhere on the map (even in another lane!).</li>
              <li>The enemy creeps will immediately target you, ignoring your creeps.</li>
              <li>Walk backward toward your ranged creep or tower. The creeps will follow you.</li>
              <li>Once you walk away, the creeps will attack your ranged creep, causing the lane to push toward you.</li>
            </ol>
            <p><strong>Cooldown:</strong> This aggro check has a **3-second cooldown**. If you click an enemy and walk away, you cannot pull aggro again for 3 seconds.</p>
          </div>

          <h3>3. Stacking & Pulling</h3>
          <p>
            If the lane is pushed too close to the enemy tower, the support must pull neutral creeps to reset the lane position:
          </p>
          <ul>
            <li><strong>Pulling:</strong> Attack the neutral creeps in the small camp next to your safe lane at **x:15** or **x:45** and run into your lane creeps. Your lane creeps will agro onto the neutrals and follow them into the jungle, denying a full wave of gold/XP from the enemy and letting your carry farm under tower safely.</li>
            <li><strong>Stacking:</strong> Neutral camps spawn every minute. If you pull neutral creeps out of their spawn box (visible by holding ALT) around **x:53** to **x:55**, the game will detect the box is empty and spawn another set of creeps. This creates "stacked" camps, maximizing farm for your carry's AoE clearing items.</li>
          </ul>

          <div className="pro-tip-box">
            <h5><Award size={16} /> Pro-Tip: The Half-Pull</h5>
            <p>
              If you pull the entire lane wave into a single, unstacked small camp, your creeps will kill the neutrals and push the next wave even harder. Instead, perform a **Half-Pull**: draw the neutrals so that only 1 or 2 of your lane creeps follow them. This freezes the lane perfectly in front of your tower.
            </p>
          </div>

          <h3>4. Laning Regen & Trading</h3>
          <p>
            Dota is a game of attrition. If you run out of regen, you lose the lane:
          </p>
          <ul>
            <li><strong>Trading:</strong> Use auto-attacks to harass the enemy when they go for a last hit. If they are hitting a creep, they cannot hit you back.</li>
            <li><strong>Healing Items:</strong> Always start the game with at least 1 set of Tangos and a Healing Salve. If you get brought down to low health, use a Salve behind your tower. Do not stay in lane low-HP; you will get dived.</li>
            <li><strong>The Courier:</strong> Use your personal courier to bring healing items, mana regen (mangos, clarities), and stat components. In Dota, you do not need to recall to base to buy items. Keep your courier flying!</li>
          </ul>
        </div>
      )
    },
    {
      title: "Module 3: Objectives & Economy",
      subtitle: "Roshan, Tormentors, Lotus Pools, Wisdom Runes, Twin Gates",
      description: "Dota 2 patch 7.33 expanded the map by 40% and filled the corners with critical objectives. Controlling these is how you secure map dominance.",
      content: (
        <div className="module-markdown">
          <h3>1. Roshan: The King of Objectives</h3>
          <p>
            Roshan is the ultimate neutral creep. Defeating him grants game-winning items:
          </p>
          <ul>
            <li><strong>The Day/Night Pit Swap:</strong> Roshan has two pits located at the top-left (Dire side) and bottom-right (Radiant side) of the map. During the **day**, he resides in the Radiant (bottom-right) pit. At **night**, he channels a portal and teleports to the Dire (top-left) pit. He can be attacked while teleporting!</li>
            <li><strong>Roshan Drops:</strong>
              <br />- **1st Death:** Aegis of the Immortal (grants a second life; expires after 5 minutes).
              <br />- **2nd Death:** Aegis + Cheese (instantly restores 2500 HP and 1500 Mana) OR Roshan's Banner.
              <br />- **3rd Death:** Aegis + Refresher Shard (resets all cooldowns) OR Aghanim's Scepter.
            </li>
            <li><strong>Roshan's Banner:</strong> A placeable banner that buffs lane creeps, granting them extra health and damage. Place it deep in an enemy lane to push automatically while your team group elsewhere.</li>
          </ul>

          <div className="mechanic-warning-box">
            <h5><ShieldAlert size={16} /> Warning: Roar of Retribution</h5>
            <p>
              Roshan has a passive ability: **Roar of Retribution**. If he is attacked by the team that killed him last, he will unleash a global roar, dealing damage to all units in a radius and applying a 20% damage amplification debuff. Be ready to sustain this burst!
            </p>
          </div>

          <h3>2. Tormentors: Team Shard Bosses</h3>
          <p>
            Tormentors are cube-like mini-bosses that spawn at **20:00** behind each team's offlane base area.
          </p>
          <ul>
            <li><strong>Mechanic:</strong> They do not attack. Instead, they possess a barrier that **reflects 70% of all damage received** back to the attackers as unmitigated physical and magical damage.</li>
            <li><strong>Aghanim's Shard Reward:</strong> Killing the Tormentor rewards an Aghanim's Shard (worth 1400 gold, upgrades an ability) to one of the two lowest-net-worth players on the killing team.</li>
            <li><strong>Respawn:</strong> They respawn 10 minutes after being destroyed, with their barrier and health reflections scaling stronger each time.</li>
          </ul>

          <h3>3. New Map Objectives</h3>
          <table className="objectives-table">
            <thead>
              <tr>
                <th>Objective</th>
                <th>Spawn / Cycle Time</th>
                <th>Strategic Function & Tips</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Lotus Pools</strong></td>
                <td>Spawns fruit every 3 minutes starting at 3:00.</td>
                <td>Harvesting Lotuses grants instant HP/Mana restoration. Collecting 3 allows you to combine them into Greater Lotuses. Highly contested during the laning phase.</td>
              </tr>
              <tr>
                <td><strong>Wisdom Runes</strong></td>
                <td>Spawns every 7 minutes (7:00, 14:00, 21:00...)</td>
                <td>Located near each base. Grants massive experience to the hero who captures it. Supports should prioritize securing their own rune and stealing the enemy's.</td>
              </tr>
              <tr>
                <td><strong>Twin Gates</strong></td>
                <td>Always Active. 3-second channel.</td>
                <td>Portals located in the top-left and bottom-right corners of the map. Allows players to teleport across the map for free. Essential for offlane-to-safelane ganks.</td>
              </tr>
              <tr>
                <td><strong>Watchers</strong></td>
                <td>Can be captured at any time. Deactivates when hit.</td>
                <td>Statues scattered across the map. Right-clicking one activates it, granting 800-radius vision. Essential for controlling Roshan pits and jungle entrances.</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      title: "Module 4: Hero Stats & Itemization",
      subtitle: "STR/AGI/INT/Universal, Dispels, Damage types, BKB & Debuff Immunity",
      description: "Dota 2 has a complex stat equation and highly active items. Understanding how attributes, damage types, and dispels interact is key to high-level play.",
      content: (
        <div className="module-markdown">
          <h3>1. Primary Attributes</h3>
          <p>
            Dota 2 heroes are grouped into four categories based on their primary attribute. Each attribute provides general stats, but your primary attribute also grants **+1 Attack Damage per point** (+0.7 for Universal):
          </p>
          <ul>
            <li><strong>Strength (STR):</strong> Grants +22 Max Health, +0.1 HP Regen, and Magic Resistance per point. STR heroes are typically tanky initiators. <em>(Examples: Axe, Tiny, Lifestealer)</em></li>
            <li><strong>Agility (AGI):</strong> Grants +1/6 Armor and +1 Attack Speed per point. AGI carries scale extremely well into the late-game due to high attack speed and armor. <em>(Examples: Phantom Assassin, Juggernaut, Drow Ranger)</em></li>
            <li><strong>Intelligence (INT):</strong> Grants +12 Max Mana, +0.05 Mana Regen, and Spell Amplification. INT heroes are spellcasters with massive active spell impacts. <em>(Examples: Invoker, Storm Spirit, Crystal Maiden)</em></li>
            <li><strong>Universal:</strong> Added in Patch 7.33. They do not have a single primary attribute. Instead, they gain **+0.7 Attack Damage per point of ANY attribute**. This makes them highly versatile with mixed item builds. <em>(Examples: Windranger, Abaddon, Invoker, Void Spirit)</em></li>
          </ul>

          <h3>2. Damage Types & Resistances</h3>
          <p>
            Understanding damage types allows you to build the correct defensive items:
          </p>
          <table className="damage-table">
            <thead>
              <tr>
                <th>Damage Type</th>
                <th>Mitigated By</th>
                <th>BKB / Debuff Immunity Behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Physical</strong></td>
                <td>Armor & Damage Block (Crimson Guard/Vanguard)</td>
                <td>Pierces Debuff Immunity entirely. BKB does not reduce physical damage.</td>
              </tr>
              <tr>
                <td><strong>Magical</strong></td>
                <td>Magic Resistance (Pipe of Insight, Glimmer Cape)</td>
                <td>Blocked/Reduced by Debuff Immunity (BKB grants 60%+ Magic Resistance).</td>
              </tr>
              <tr>
                <td><strong>Pure</strong></td>
                <td>None (direct HP reduction)</td>
                <td>If the spell does not pierce Debuff Immunity, pure damage is **completely negated** by BKB. If the spell pierces BKB, it deals full damage.</td>
              </tr>
            </tbody>
          </table>

          <h3>3. Dispels: Basic vs. Strong</h3>
          <p>
            Dispels remove negative status effects (debuffs) from allies or positive buffs from enemies.
          </p>
          <ul>
            <li><strong>Basic Dispel:</strong> Removes slows, silences, and roots. Items like Manta Style, Lotus Orb, and Eul's Scepter apply a basic dispel to the caster.</li>
            <li><strong>Strong Dispel:</strong> The only dispel type that can remove **stuns** and hexes. Standard item dispels do not apply strong dispels. You must rely on hero abilities (like Abaddon's Aphotic Shield or Legion Commander's Press the Attack) or buy **Aeon Disk** (which triggers a strong dispel automatically at 70% HP).</li>
          </ul>

          <h3>4. Black King Bar (BKB) & Debuff Immunity</h3>
          <div className="info-box">
            <h5><ShieldAlert size={16} /> The Debuff Immunity Mechanics</h5>
            <p>
              In current patches, BKB grants **Debuff Immunity** instead of "Spell Immunity". Here is what you need to know:
            </p>
            <ol>
              <li><strong>Targetability:</strong> Enemies can target you with spells even when your BKB is active.</li>
              <li><strong>Debuff Block:</strong> Stuns, silences, and slows that do not pierce Debuff Immunity will fail to affect you. However, their timers still run. If BKB expires while the stun is still active on you, you will be stunned for the remaining duration.</li>
              <li><strong>Magic Resistance:</strong> BKB grants you a temporary magic resistance shield. Magic spells that do not pierce Debuff Immunity will deal reduced damage.</li>
              <li><strong>Piercing Spells:</strong> Spells that say "Pierces Debuff Immunity" (like Beastmaster's Primal Roar or Bane's Fiend's Grip) will stun you and deal full damage, bypassing BKB entirely.</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: "Module 5: Mid-to-Late Game Strategy",
      subtitle: "Map rotations, Smoke of Deceit, High-Ground sieging, Buyback control",
      description: "Once towers start falling, the game transitions from individual lanes to team coordinates. Here is how to navigate the mid and late game.",
      content: (
        <div className="module-markdown">
          <h3>1. Rotations & Map Control</h3>
          <p>
            The mid-game is about choking the enemy's resources:
          </p>
          <ul>
            <li><strong>Dead Lane Theory:</strong> The lane that is most dangerous to farm (usually your safe lane after your Tier 1 tower falls). Do not force your carry to farm here. Let them rotate to the offlane jungle (the Triangle), which is much easier to defend.</li>
            <li><strong>Twin Gate Rotations:</strong> Supports and midlaners should utilize the Twin Gates to surprise the enemy. A gank from the offlane into the safelane can secure a tower and open up the map.</li>
            <li><strong>Warding Territory:</strong> Place wards on high-ground cliffs overlooking enemy jungle entrances. This allows your team to farm the enemy jungle safely, stealing their farm.</li>
          </ul>

          <h3>2. Smoke of Deceit: The Ultimate Gank Tool</h3>
          <p>
            **Smoke of Deceit** is a consumable item that turns all nearby allies invisible and grants movement speed.
          </p>
          <div className="pro-tip-box">
            <h5><Award size={16} /> Smoke Gank Rules</h5>
            <ul>
              <li><strong>Invisibility:</strong> Smoke invisibility cannot be detected by normal Observer/Sentry Wards. It only breaks when you get within **1025 units** of an enemy hero or tower.</li>
              <li><strong>When to Smoke:</strong> Smoke when you have key ultimate abilities ready (like Chronosphere or Ravage), or when you want to contest Roshan. Do not walk up high-ground blind; smoke up first.</li>
              <li><strong>Breaking Smoke:</strong> If your smoke breaks, it means an enemy hero is nearby (even if they are invisible!). React immediately by casting spells or retreating.</li>
            </ul>
          </div>

          <h3>3. Sieging High-Ground (Tier 3 Towers)</h3>
          <p>
            Many games are thrown when trying to push into the enemy base. High-ground defense is extremely strong in Dota:
          </p>
          <ul>
            <li><strong>The Glyph of Fortification:</strong> Teams have a global active that makes all towers immune to damage and shoots multishots. Pushing teams must wait out or bait the Glyph before committing. Note: Killing a Tier 2/Tier 3 tower refreshes the defender's Glyph cooldown!</li>
            <li><strong>High-Ground Vision:</strong> Never push the base without vision. Place an Observer Ward on the high-ground cliffs inside the enemy base before hitting the tower.</li>
            <li><strong>Aegis Priority:</strong> The hero with the Aegis (usually the Carry) should hit the tower alone. The rest of the team should stand back on the low-ground, ready to counter-initiate if the enemy jumps the carry.</li>
          </ul>

          <h3>4. Buyback Management</h3>
          <p>
            A buyback can turn a lost fight into a team wipe. However, buybacks are expensive:
          </p>
          <div className="mechanic-warning-box">
            <h5><ShieldAlert size={16} /> Buyback Penalty</h5>
            <p>
              When you buy back:
              <br />
              1. **Gold Penalty:** A percentage of your future gold income is reduced for a duration.
              <br />
              2. **Death Timer Penalty:** 25% of your remaining death time is added to your next death.
              <br />
              **Rule of Thumb:** Keep enough gold for buyback at all times after the 30-minute mark. Never spend all your gold on an item component if it puts you below your buyback threshold.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Module 6: Drafting & Mindset",
      subtitle: "Hero synergies, Counter-picking, Communication, Tilt management",
      description: "Dota matches are often won or lost in the draft. Furthermore, because matches are long and complex, mental resilience is a core competitive skill.",
      content: (
        <div className="module-markdown">
          <h3>1. Drafting & Team Compositions</h3>
          <p>
            A balanced Dota 2 team composition needs to address multiple checklist items:
          </p>
          <ul>
            <li><strong>Stuns & Catch:</strong> You must have reliable lockdown spells. If you have no stuns, highly mobile heroes (like Puck, Spirit Breaker, or Weaver) will run circles around you.</li>
            <li><strong>Waveclear:</strong> You need heroes that can quickly kill creep waves (like Lina, Keeper of the Light, or Underlord). If you cannot clear waves, the enemy will chip away at your towers with zero risk.</li>
            <li><strong>Initiation:</strong> Someone needs to jump in and start the fight. This is usually the Position 3 Offlaner buying a **Blink Dagger** (e.g., Axe, Magnus).</li>
            <li><strong>Scaling:</strong> Ensure your Position 1 and 2 heroes have physical and magical scaling that matches the game length.</li>
          </ul>

          <h3>2. Counter-Picking Basics</h3>
          <p>
            Look at the enemy picks and select counters:
          </p>
          <ul>
            <li><strong>Armor Counters:</strong> Against high armor AGI heroes, pick magic/pure damage spellcasters (like Timbersaw). Against low armor strength heroes, buy minus-armor items (like Desolator, Assault Cuirass) or pick heroes like Slardar.</li>
            <li><strong>Illusion Counters:</strong> Against illusion heroes (like Phantom Lancer, Chaos Knight), pick heroes with heavy AoE clear (like Earthshaker, Sand King, or Mjollnir carriers).</li>
            <li><strong>Regen Counters:</strong> Against heavy healers (like Necrophos, Alchemist, or Io), pick heroes that can build **Spirit Vessel**, or buy healing-reduction items like **Shiva's Guard** or **Eye of Skadi**.</li>
          </ul>

          <div className="info-box">
            <h5><Info size={16} /> The Draft Order</h5>
            <p>
              In Ranked matchmaking:
              <br />- **Phase 1:** Supports (Pos 4 & 5) pick first. This hides the carry picks and ensures your team doesn't get counter-picked.
              <br />- **Phase 2:** Offlaner (Pos 3) and Midlaner (Pos 2) pick next.
              <br />- **Phase 3:** The Carry (Pos 1) picks last, allowing them to dodge hard counters.
            </p>
          </div>

          <h3>3. Communication & The Mental Game</h3>
          <p>
            Dota 2 is notorious for toxicity. Your mental fortitude is as important as your mechanical skill:
          </p>
          <ul>
            <li><strong>The Mute Button is Your Friend:</strong> The moment a teammate begins complaining or flaming, mute them. Do not argue. Arguing occupies your attention and makes you play worse.</li>
            <li><strong>Ping Communication:</strong> Use ALT-clicks to communicate objectives. You can ALT-click enemy portraits to show they are missing, ALT-click your own abilities to show cooldowns, and ALT-click the clock to log Roshan death times.</li>
            <li><strong>Comeback Mechanics:</strong> Dota 2 has massive rubber-band mechanics. Killing an enemy hero with a high streak rewards your team with thousands of gold and XP. Never give up (GG) early; one teamfight turn-around high-ground can completely flip the game.</li>
          </ul>
        </div>
      )
    }
  ];

  const currentModule = modulesData[selectedModule];

  return (
    <div className="module-content-container animate-fade-in">
      <div className="module-header-box glass-card">
        <div className="module-badge-row">
          <span className="badge badge-primary">Chapter 0{selectedModule + 1}</span>
          {progress.modulesCompleted[selectedModule] && (
            <span className="badge badge-gold"><CheckCircle size={12} style={{ marginRight: '4px' }} /> Read</span>
          )}
        </div>
        <h1 className="module-title">{currentModule.title}</h1>
        <p className="module-subtitle">{currentModule.subtitle}</p>
        <p className="module-desc-text">{currentModule.description}</p>
      </div>

      <div className="module-body-content glass-card">
        {currentModule.content}
      </div>

      {/* Pagination Actions */}
      <div className="module-pagination">
        <button 
          className="btn btn-secondary" 
          onClick={handlePrev} 
          disabled={selectedModule === 0}
        >
          <ChevronLeft size={16} /> Previous Chapter
        </button>

        <div className="pagination-dots">
          {modulesData.map((_, idx) => (
            <div 
              key={idx} 
              className={`pagination-dot ${idx === selectedModule ? 'dot-active' : ''} ${progress.modulesCompleted[idx] ? 'dot-completed' : ''}`}
              onClick={() => { setSelectedModule(idx); window.scrollTo(0, 0); }}
            />
          ))}
        </div>

        <button className="btn btn-primary" onClick={handleNext}>
          {selectedModule === 5 ? 'Take Final Exam' : 'Next Chapter'} <ChevronRight size={16} />
        </button>
      </div>

      <style>{`
        .module-content-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
        }

        .module-header-box {
          padding: 32px;
          border-left: 6px solid var(--color-primary);
          background: linear-gradient(135deg, rgba(21, 18, 38, 0.8), rgba(14, 11, 26, 0.9));
        }

        .module-badge-row {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .module-title {
          font-size: 2.2rem;
          font-weight: 850;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .module-subtitle {
          font-size: 1.1rem;
          color: var(--color-accent-gold);
          font-weight: 600;
          margin-bottom: 12px;
        }

        .module-desc-text {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.6;
        }

        .module-body-content {
          padding: 40px;
          background: rgba(21, 18, 38, 0.55);
          border-color: rgba(255, 255, 255, 0.04);
        }

        @media (max-width: 768px) {
          .module-header-box, .module-body-content {
            padding: 24px;
          }
          .module-title {
            font-size: 1.6rem;
          }
        }

        /* Markdown Text Styling */
        .module-markdown h3 {
          font-size: 1.4rem;
          margin-top: 32px;
          margin-bottom: 14px;
          color: #fff;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 8px;
        }

        .module-markdown h3:first-of-type {
          margin-top: 0;
        }

        .module-markdown p {
          color: var(--text-main);
          font-size: 0.98rem;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .module-markdown ul, .module-markdown ol {
          margin-bottom: 20px;
          padding-left: 24px;
        }

        .module-markdown li {
          margin-bottom: 8px;
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .module-markdown strong {
          color: #fff;
        }

        /* Roles Grid styles */
        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin: 24px 0;
        }

        .role-card {
          padding: 20px;
          position: relative;
          background: rgba(10, 8, 20, 0.5);
          border-color: rgba(255, 255, 255, 0.03);
        }

        .role-card:hover {
          border-color: var(--color-primary);
        }

        .role-num {
          position: absolute;
          top: 12px;
          right: 16px;
          font-family: var(--font-headings);
          font-size: 2.2rem;
          font-weight: 950;
          color: rgba(142, 68, 173, 0.15);
          line-height: 1;
        }

        .role-card h4 {
          font-size: 1.05rem;
          margin-bottom: 8px;
          color: #fff;
        }

        .role-card p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .role-examples {
          font-size: 0.8rem;
          color: var(--text-dim);
          border-top: 1px solid var(--border-light);
          padding-top: 8px;
        }

        /* Objectives Table styles */
        .objectives-table, .damage-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: rgba(0,0,0,0.15);
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--border-light);
        }

        .objectives-table th, .damage-table th {
          background: rgba(142, 68, 173, 0.1);
          text-align: left;
          padding: 12px 16px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-accent-gold);
          border-bottom: 1px solid var(--border-light);
        }

        .objectives-table td, .damage-table td {
          padding: 14px 16px;
          font-size: 0.9rem;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          color: var(--text-muted);
          vertical-align: top;
        }

        .objectives-table tr:last-child td, .damage-table tr:last-child td {
          border-bottom: none;
        }

        /* Pagination style */
        .module-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
        }

        .pagination-dots {
          display: flex;
          gap: 10px;
        }

        .pagination-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .pagination-dot:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .dot-active {
          background: var(--color-primary) !important;
          box-shadow: 0 0 8px var(--color-primary);
          transform: scale(1.2);
        }

        .dot-completed {
          background: rgba(142, 68, 173, 0.5);
        }

        @media (max-width: 600px) {
          .module-pagination {
            flex-direction: column;
            gap: 16px;
          }
          .pagination-dots {
            order: -1;
          }
        }
      `}</style>
    </div>
  );
}
