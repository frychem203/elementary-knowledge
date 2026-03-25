import { useState, useEffect } from 'react';
import { shuffle } from '../utils';

// Build a shuffled deck. For "both directions" we randomly assign front/back per card.
function buildDeck(category) {
  const { items, monoTerm, monoAnswer } = category;
  const cards = items.map((item) => {
    const termFirst = Math.random() > 0.5;
    return {
      front:     termFirst ? item.term   : item.answer,
      back:      termFirst ? item.answer : item.term,
      frontMono: termFirst ? monoTerm    : monoAnswer,
      backMono:  termFirst ? monoAnswer  : monoTerm,
    };
  });
  return shuffle(cards);
}

export default function Flashcard({ category, onFinish, onBack }) {
  const [deck, setDeck]           = useState(() => buildDeck(category));
  const [index, setIndex]         = useState(0);
  const [flipped, setFlipped]     = useState(false);
  const [animating, setAnimating] = useState(false);
  const [correct, setCorrect]     = useState(0);
  const [missed, setMissed]       = useState(0);

  // Reset whenever category changes (e.g. Study Again from parent won't re-mount)
  useEffect(() => {
    setDeck(buildDeck(category));
    setIndex(0);
    setFlipped(false);
    setCorrect(0);
    setMissed(0);
  }, [category]);

  const card    = deck[index];
  const total   = deck.length;
  const progress = ((index) / total) * 100;

  function handleFlip() {
    if (animating) return;
    setFlipped((f) => !f);
  }

  function grade(isCorrect) {
    if (animating) return;
    const newCorrect = isCorrect ? correct + 1 : correct;
    const newMissed  = isCorrect ? missed      : missed + 1;

    if (index + 1 >= total) {
      onFinish({ correct: newCorrect, missed: newMissed, total });
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      setCorrect(newCorrect);
      setMissed(newMissed);
      setIndex((i) => i + 1);
      setFlipped(false);
      setAnimating(false);
    }, 300);
  }

  return (
    <div className="page study-page">
      <div className="study-header">
        <button className="back-btn" onClick={onBack}>← Categories</button>
        <div className="study-title-row">
          <h2 className="study-title" style={{ color: category.unitColor }}>{category.name}</h2>
          <span className="study-mode-tag">Flashcards</span>
        </div>
        <div className="progress-row">
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%`, background: category.unitColor }}
            />
          </div>
          <span className="progress-label">{index + 1} / {total}</span>
        </div>
        <div className="score-row">
          <span className="score-correct">✓ {correct}</span>
          <span className="score-missed">✗ {missed}</span>
        </div>
      </div>

      <div
        className={`flashcard-scene ${animating ? 'card-exit' : ''}`}
        onClick={!flipped ? handleFlip : undefined}
      >
        <div className={`flashcard ${flipped ? 'flashcard--flipped' : ''}`}>
          {/* Front */}
          <div className="flashcard-face flashcard-front" style={{ borderTopColor: category.unitColor }}>
            <div className="flashcard-hint">tap to flip</div>
            <div className={`flashcard-text ${card.frontMono ? 'mono' : ''}`}>
              {card.front}
            </div>
          </div>

          {/* Back */}
          <div className="flashcard-face flashcard-back" style={{ borderTopColor: category.unitColor }}>
            <div className="flashcard-hint">How'd you do?</div>
            <div className={`flashcard-text ${card.backMono ? 'mono' : ''}`}>
              {card.back}
            </div>
            <div className="grade-buttons">
              <button className="grade-btn grade-correct" onClick={() => grade(true)}>
                Got it ✓
              </button>
              <button className="grade-btn grade-missed" onClick={() => grade(false)}>
                Missed it ✗
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="flip-hint-text">{flipped ? '' : 'Click the card to reveal the answer'}</p>
    </div>
  );
}
