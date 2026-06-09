import { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  RefreshCw,
  Trophy
} from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

interface SpeedrunQuizzesProps {
  progress: {
    modulesCompleted: boolean[];
    quizzesPassed: boolean[];
  };
  setQuizzesPassed: (passed: boolean[]) => void;
}

export default function SpeedrunQuizzes({ progress, setQuizzesPassed }: SpeedrunQuizzesProps) {
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number>(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const quizzes: QuizData[] = [
    {
      title: "Module 1 Quiz: Core Fundamentals",
      questions: [
        {
          question: "Which position is responsible for roaming the map, contesting active runes, setting up early ganks, and purchasing utility items?",
          options: [
            "Position 1 (Hard Carry)",
            "Position 3 (Offlaner)",
            "Position 4 (Soft Support)",
            "Position 5 (Hard Support)"
          ],
          answerIndex: 2,
          explanation: "Position 4 (Soft Support) lanes in the offlane but focuses heavily on active roaming, rune contestation, and utility itemization to create space."
        },
        {
          question: "In Patch 7.36, when are Hero Facets selected?",
          options: [
            "Before searching for a match",
            "During the drafting and strategy phase",
            "At level 6 in-game",
            "Automatically depending on your item build"
          ],
          answerIndex: 1,
          explanation: "Hero Facets are chosen during the drafting/strategy phase of each match, allowing players to customize their hero's playstyle based on the team comps."
        },
        {
          question: "How does denying an allied creep affect the enemy's laning resources?",
          options: [
            "Denies them 100% of the gold and reduces their XP gained by 50% (75% for melee creeps)",
            "Denies 50% of gold and 50% of XP",
            "Grants gold to you and steals XP from their inventory",
            "Gives the enemy hero a double damage boost"
          ],
          answerIndex: 0,
          explanation: "Denying allied creeps prevents the enemy from getting any gold and cuts the experience they would have received in half (or more depending on creep type)."
        }
      ]
    },
    {
      title: "Module 2 Quiz: Laning Stage",
      questions: [
        {
          question: "What is the check radius to trigger Creep Aggro Manipulation on enemy creeps?",
          options: [
            "1000 units",
            "700 units",
            "500 units",
            "250 units"
          ],
          answerIndex: 2,
          explanation: "The creep aggro check radius is 500 units. You must stand within this distance of enemy creeps and issue an attack command on an enemy hero."
        },
        {
          question: "What is the internal cooldown of pulling creep aggro?",
          options: [
            "1 second",
            "3 seconds",
            "8 seconds",
            "No cooldown"
          ],
          answerIndex: 1,
          explanation: "Creep aggro has a 3-second internal cooldown. Once you pull aggro, you cannot pull it again for 3 seconds, even if you spam-click an enemy hero."
        },
        {
          question: "At what times should a support pull the small neutral camp to redirect their lane creeps?",
          options: [
            "x:00 or x:30",
            "x:15 or x:45",
            "x:53 or x:55",
            "x:05 or x:35"
          ],
          answerIndex: 1,
          explanation: "Lane creeps pass near the small camp at x:15 and x:45. Attacking the camp and running into the lane at this time redirects your creeps into the jungle."
        }
      ]
    },
    {
      title: "Module 3 Quiz: Objectives & Economy",
      questions: [
        {
          question: "At what time does the first Tormentor boss spawn behind each team's offlane areas?",
          options: [
            "10:00",
            "15:00",
            "20:00",
            "30:00"
          ],
          answerIndex: 2,
          explanation: "Tormentors spawn at exactly 20:00. Defeating them awards an Aghanim's Shard to one of the two lowest-net-worth players on the team."
        },
        {
          question: "What is the spawning behavior of Roshan in modern patches?",
          options: [
            "He stays in the river pit the entire game.",
            "He teleports randomly to any neutral creep camp.",
            "He stays in the Radiant (bottom-right) pit during the day and teleports to the Dire (top-left) pit at night.",
            "He respawns instantly if you kill him during the night."
          ],
          answerIndex: 2,
          explanation: "Roshan resides in the Radiant pit during the day and channels a teleport to the Dire pit at night (cycles occur every 5 minutes: day at 0:00, night at 5:00, day at 10:00, etc.)."
        },
        {
          question: "What drop item does Roshan provide on his second death when killed in the Radiant (Day) pit?",
          options: [
            "Aegis + Cheese",
            "Aegis + Refresher Shard",
            "Aegis + Roshan's Banner",
            "Aegis + Aghanim's Scepter"
          ],
          answerIndex: 2,
          explanation: "On the 2nd death, Roshan drops Aegis + Cheese if killed in the Dire (night) pit, but drops Aegis + Roshan's Banner if killed in the Radiant (day) pit."
        }
      ]
    },
    {
      title: "Module 4 Quiz: Stats & Itemization",
      questions: [
        {
          question: "Under the BKB 'Debuff Immunity' system, what happens if you get targeted by a 4-second stun while BKB is active, and BKB expires 2 seconds later?",
          options: [
            "You ignore the stun entirely.",
            "You are stunned for the remaining 2 seconds after BKB expires.",
            "The stun duration is doubled.",
            "Your BKB is immediately destroyed."
          ],
          answerIndex: 1,
          explanation: "BKB blocks the stun effect while active, but the debuff timer still counts down. If BKB expires before the debuff is finished, the remaining duration of the stun takes effect."
        },
        {
          question: "Which of the following items is a reactive defense that triggers a Strong Dispel (removing stuns) when you take heavy damage?",
          options: [
            "Manta Style",
            "Lotus Orb",
            "Aeon Disk",
            "Eul's Scepter"
          ],
          answerIndex: 2,
          explanation: "Aeon Disk triggers a Strong Dispel when your health falls below 70%, immediately purging all stuns, silences, and debuffs, and granting damage immunity for 2.5 seconds."
        },
        {
          question: "How is Pure Damage handled when Black King Bar (Debuff Immunity) is active?",
          options: [
            "It deals 100% damage to you regardless.",
            "It is completely negated if the source ability does not pierce Debuff Immunity.",
            "It is converted into healing.",
            "It pierces BKB and deals double damage."
          ],
          answerIndex: 1,
          explanation: "Pure damage from spells that do not pierce Debuff Immunity is 100% negated by BKB. If the spell pierces Debuff Immunity, it deals its full damage."
        }
      ]
    },
    {
      title: "Module 5 Quiz: Mid-to-Late Game",
      questions: [
        {
          question: "What is the detection radius of a Smoke of Deceit, and what breaks it?",
          options: [
            "500 units; broken by wards and towers.",
            "1025 units; broken by enemy heroes or towers.",
            "1500 units; broken by neutral creeps.",
            "Broken only when you attack."
          ],
          answerIndex: 1,
          explanation: "Smoke of Deceit has a 1025 breaking radius. It is completely immune to observer/sentry wards and only breaks when you get close to an enemy hero or tower."
        },
        {
          question: "What happens to the defender's Glyph of Fortification when a Tier 2 or Tier 3 tower is destroyed?",
          options: [
            "It is put on a 10-minute cooldown.",
            "It is instantly refreshed, granting them another Glyph charge.",
            "It becomes 50% weaker.",
            "Nothing happens."
          ],
          answerIndex: 1,
          explanation: "Killing a Tier 2 or Tier 3 tower instantly refreshes the defender's Glyph of Fortification, allowing them to fortify their base if you try to push the next tower too quickly."
        },
        {
          question: "When you buy back, what penalty is applied to your death timer?",
          options: [
            "No penalty.",
            "You cannot die for the next 5 minutes.",
            "25% of your remaining death time is added to your next death timer.",
            "You are locked out of buying back for the rest of the game."
          ],
          answerIndex: 2,
          explanation: "Buyback has a penalty: 25% of the death timer you had remaining when you bought back is added to your next respawn timer."
        }
      ]
    },
    {
      title: "Module 6 Quiz: Drafting & Mindset",
      questions: [
        {
          question: "In standard Ranked draft phases, why should supports pick during Phase 1?",
          options: [
            "Because support heroes are useless.",
            "To secure their lane items faster.",
            "To hide the Carry and Midlaner picks, preventing them from being counter-picked by the enemy cores.",
            "Because the game forces them to by locking other heroes."
          ],
          answerIndex: 2,
          explanation: "Supports pick first to keep core selections hidden. This prevents the enemy team from drafting direct counters to your Position 1 Carry and Position 2 Midlaner."
        },
        {
          question: "Which item should you buy to counter heavy healing/sustain heroes like Alchemist, Necrophos, or Io?",
          options: [
            "Spirit Vessel",
            "Black King Bar",
            "Force Staff",
            "Manta Style"
          ],
          answerIndex: 0,
          explanation: "Spirit Vessel (or items like Shiva's Guard/Eye of Skadi) applies a health regen reduction debuff, severely reducing the effectiveness of healers and high-sustain targets."
        },
        {
          question: "If a teammate is flame-pinging or writing toxic comments, what is the optimal pro response?",
          options: [
            "Flame them back so they learn their place.",
            "Argue with them and explain your build.",
            "Immediately mute their text/voice/pings and focus entirely on your own gameplay.",
            "De-rank on purpose to ruin their match."
          ],
          answerIndex: 2,
          explanation: "Arguing is a waste of mental energy and focus. The optimal pro play is to mute toxic teammates instantly, maintain your composure, and execute your game plan."
        }
      ]
    }
  ];

  const currentQuiz = quizzes[selectedQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIdx];

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.answerIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);

    if (currentQuestionIdx < currentQuiz.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setQuizFinished(true);
      // Mark quiz as passed if score is perfect
      const finalScore = score + (selectedOption === currentQuestion.answerIndex ? 1 : 0);
      const passedAll = finalScore === currentQuiz.questions.length;
      if (passedAll) {
        const updated = [...progress.quizzesPassed];
        updated[selectedQuizIndex] = true;
        setQuizzesPassed(updated);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleQuizSelect = (idx: number) => {
    setSelectedQuizIndex(idx);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    if (window.innerWidth < 992) {
      setTimeout(() => {
        const quizContainer = document.getElementById('active-quiz-container');
        if (quizContainer) {
          quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="quizzes-view-container animate-fade-in">
      <div className="quizzes-header glass-card">
        <h1 className="page-title"><HelpCircle size={24} color="#d4af37" style={{ marginRight: '8px' }} /> Knowledge Checks</h1>
        <p className="page-subtitle">Pass each module's quiz with a 100% score to unlock your strategic Speedrun Trophies.</p>
      </div>

      <div className="quizzes-layout-grid">
        {/* Selector Sidebar */}
        <div className="quizzes-selector-column">
          <div className="glass-card sidebar-card">
            <h3 className="sidebar-card-title">Select Quiz</h3>
            <div className="quiz-select-list">
              {quizzes.map((q, idx) => {
                const isPassed = progress.quizzesPassed[idx];
                const isActive = selectedQuizIndex === idx;
                return (
                  <button
                    key={idx}
                    className={`quiz-select-btn ${isActive ? 'quiz-active' : ''}`}
                    onClick={() => handleQuizSelect(idx)}
                  >
                    <BookOpen size={16} className="quiz-btn-icon" />
                    <span className="quiz-btn-title">{q.title.replace('Quiz: ', ': ')}</span>
                    {isPassed && <span className="quiz-check-badge">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Quiz Box */}
        <div className="active-quiz-column" id="active-quiz-container">
          {!quizFinished ? (
            <div className="quiz-card glass-card">
              <div className="quiz-progress-header">
                <span className="quiz-module-tag">{currentQuiz.title}</span>
                <span className="question-count">Question {currentQuestionIdx + 1} of {currentQuiz.questions.length}</span>
              </div>

              <h2 className="quiz-question-text">{currentQuestion.question}</h2>

              <div className="quiz-options-list">
                {currentQuestion.options.map((option, idx) => {
                  let optionClass = '';
                  if (isSubmitted) {
                    if (idx === currentQuestion.answerIndex) {
                      optionClass = 'option-correct';
                    } else if (idx === selectedOption) {
                      optionClass = 'option-incorrect';
                    } else {
                      optionClass = 'option-disabled';
                    }
                  } else if (idx === selectedOption) {
                    optionClass = 'option-selected';
                  }

                  return (
                    <button
                      key={idx}
                      className={`quiz-option-btn ${optionClass}`}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isSubmitted}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                      <span className="option-text">{option}</span>
                      {isSubmitted && idx === currentQuestion.answerIndex && (
                        <CheckCircle2 size={18} className="option-icon-correct" />
                      )}
                      {isSubmitted && idx === selectedOption && idx !== currentQuestion.answerIndex && (
                        <XCircle size={18} className="option-icon-incorrect" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation Box */}
              {isSubmitted && (
                <div className={`explanation-box glass-card ${selectedOption === currentQuestion.answerIndex ? 'expl-correct' : 'expl-incorrect'}`}>
                  <h4 className="explanation-title">
                    {selectedOption === currentQuestion.answerIndex ? 'Correct Answer!' : 'Incorrect Answer'}
                  </h4>
                  <p className="explanation-text">{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="quiz-actions">
                {!isSubmitted ? (
                  <button 
                    className="btn btn-gold btn-block" 
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button className="btn btn-primary btn-block" onClick={handleNext}>
                    {currentQuestionIdx < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="quiz-completed-card glass-card text-center">
              <div className="trophy-glow-container">
                <Trophy size={64} className={score === currentQuiz.questions.length ? 'gold-trophy animate-bounce' : 'grey-trophy'} />
              </div>
              
              <h2 className="completion-title">
                {score === currentQuiz.questions.length ? 'Mastery Achieved!' : 'Quiz Completed'}
              </h2>
              
              <p className="completion-score">
                You scored <span className="score-highlight">{score} / {currentQuiz.questions.length}</span>
              </p>

              <p className="completion-desc">
                {score === currentQuiz.questions.length 
                  ? `Congratulations! You answered all questions correctly and unlocked the chapter trophy. You are ready for the lanes.`
                  : `You must score 100% to unlock this chapter's Speedrun Trophy. Review the masterclass materials and try again.`}
              </p>

              <div className="completion-actions">
                <button className="btn btn-secondary" onClick={resetQuiz}>
                  <RefreshCw size={14} /> Retake Quiz
                </button>
                {score === currentQuiz.questions.length && selectedQuizIndex < quizzes.length - 1 && (
                  <button className="btn btn-gold" onClick={() => handleQuizSelect(selectedQuizIndex + 1)}>
                    Next Quiz <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .quizzes-view-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .quizzes-header {
          padding: 24px;
        }

        .quizzes-layout-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 992px) {
          .quizzes-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        .sidebar-card {
          padding: 20px;
          background: rgba(14, 11, 26, 0.8);
        }

        .sidebar-card-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .quiz-select-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .quiz-select-btn {
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 8px;
          text-align: left;
          font-size: 0.88rem;
          font-weight: 600;
          width: 100%;
          border: 1px solid transparent;
          position: relative;
        }

        .quiz-select-btn:hover {
          background: rgba(255,255,255,0.03);
          color: #fff;
        }

        .quiz-active {
          background: rgba(142, 68, 173, 0.1) !important;
          border-color: rgba(142, 68, 173, 0.25) !important;
          color: #fff !important;
        }

        .quiz-btn-icon {
          flex-shrink: 0;
        }

        .quiz-active .quiz-btn-icon {
          color: var(--color-primary);
        }

        .quiz-check-badge {
          background: var(--color-accent-gold);
          color: #0c0914;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          margin-left: auto;
          box-shadow: 0 0 6px var(--color-accent-gold-glow);
        }

        /* Active Quiz card */
        .quiz-card {
          padding: 32px;
          background: rgba(21, 18, 38, 0.65);
        }

        .quiz-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 12px;
          margin-bottom: 24px;
        }

        .quiz-module-tag {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-accent-gold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .question-count {
          font-size: 0.8rem;
          color: var(--text-dim);
          font-weight: 600;
        }

        .quiz-question-text {
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .quiz-options-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .quiz-option-btn {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-light);
          padding: 16px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
          color: var(--text-main);
          font-size: 0.95rem;
          transition: var(--transition-fast);
          width: 100%;
        }

        .quiz-option-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.05);
          border-color: rgba(142, 68, 173, 0.3);
        }

        .option-letter {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .quiz-option-btn:hover:not(:disabled) .option-letter {
          background: var(--color-primary-glow);
          color: #fff;
          border-color: var(--color-primary);
        }

        .option-selected {
          border-color: var(--color-primary) !important;
          background: rgba(142, 68, 173, 0.08) !important;
        }

        .option-selected .option-letter {
          background: var(--color-primary) !important;
          color: #fff !important;
          border-color: var(--color-primary) !important;
        }

        .option-correct {
          border-color: var(--color-radiant) !important;
          background: rgba(46, 204, 113, 0.08) !important;
        }

        .option-correct .option-letter {
          background: var(--color-radiant) !important;
          color: #fff !important;
          border-color: var(--color-radiant) !important;
        }

        .option-incorrect {
          border-color: var(--color-dire) !important;
          background: rgba(231, 76, 60, 0.08) !important;
        }

        .option-incorrect .option-letter {
          background: var(--color-dire) !important;
          color: #fff !important;
          border-color: var(--color-dire) !important;
        }

        .option-disabled {
          opacity: 0.5;
        }

        .option-icon-correct {
          margin-left: auto;
          color: var(--color-radiant);
        }

        .option-icon-incorrect {
          margin-left: auto;
          color: var(--color-dire);
        }

        /* Explanation Box */
        .explanation-box {
          padding: 20px;
          margin-bottom: 24px;
          border-radius: 8px;
        }

        .expl-correct {
          border-left: 4px solid var(--color-radiant);
          background: rgba(46, 204, 113, 0.03);
        }

        .expl-correct .explanation-title {
          color: var(--color-radiant);
        }

        .expl-incorrect {
          border-left: 4px solid var(--color-dire);
          background: rgba(231, 76, 60, 0.03);
        }

        .expl-incorrect .explanation-title {
          color: var(--color-dire);
        }

        .explanation-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .explanation-text {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Completed view */
        .quiz-completed-card {
          padding: 48px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .text-center {
          text-align: center;
        }

        .trophy-glow-container {
          padding: 24px;
          background: rgba(255,255,255,0.02);
          border-radius: 50%;
          border: 1px solid var(--border-light);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .gold-trophy {
          color: var(--color-accent-gold);
          filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.5));
        }

        .grey-trophy {
          color: var(--text-dim);
        }

        .completion-title {
          font-size: 1.8rem;
          font-weight: 850;
          color: #fff;
        }

        .completion-score {
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .score-highlight {
          color: var(--color-accent-gold);
          font-weight: 800;
        }

        .completion-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 440px;
          margin-bottom: 12px;
        }

        .completion-actions {
          display: flex;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .completion-actions {
            flex-direction: column;
            width: 100%;
          }
          .completion-actions button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
