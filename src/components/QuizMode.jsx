import { useState, useEffect } from 'react';
import { shuffle } from '../utils';
import FillInTheBlank from './FillInTheBlank';

export default function QuizMode({ category, onFinish, onBack }) {
  const [items, setItems]     = useState(() => shuffle(category.items));
  const [index, setIndex]     = useState(0);
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed]   = useState(0);

  useEffect(() => {
    setItems(shuffle(category.items));
    setIndex(0);
    setCorrect(0);
    setMissed(0);
  }, [category]);

  const total    = items.length;
  const progress = (index / total) * 100;

  function handleGrade(isCorrect) {
    const newCorrect = isCorrect ? correct + 1 : correct;
    const newMissed  = isCorrect ? missed      : missed + 1;

    if (index + 1 >= total) {
      onFinish({ correct: newCorrect, missed: newMissed, total });
      return;
    }
    setCorrect(newCorrect);
    setMissed(newMissed);
    setIndex((i) => i + 1);
  }

  return (
    <div className="page study-page">
      <div className="study-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="study-title-row">
          <h2 className="study-title" style={{ color: category.unitColor }}>{category.name}</h2>
          <span className="study-mode-tag">Equipment Quiz</span>
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

      <div className="quiz-card">
        <FillInTheBlank
          key={index}
          item={items[index]}
          onGrade={handleGrade}
          unitColor={category.unitColor}
        />
      </div>
    </div>
  );
}
