import { useState, useEffect } from 'react';
import { shuffle } from '../utils';

// Build a question object for one item.
// Direction is random: term→definition or definition→term.
function buildQuestion(item, allItems, monoTerm, monoAnswer) {
  const termFirst = Math.random() > 0.5;

  const prompt    = termFirst ? item.term   : item.answer;
  const correct   = termFirst ? item.answer : item.term;
  const promptMono = termFirst ? monoTerm   : monoAnswer;
  const answerMono = termFirst ? monoAnswer : monoTerm;

  // Pick 3 wrong answers from the rest of the pool
  const pool = allItems.filter((i) => i !== item);
  const wrongs = shuffle(pool)
    .slice(0, 3)
    .map((i) => (termFirst ? i.answer : i.term));

  const choices = shuffle([correct, ...wrongs]);

  return { prompt, correct, choices, promptMono, answerMono };
}

export default function DefinitionQuiz({ category, onFinish, onBack }) {
  const { items, monoTerm, monoAnswer } = category;

  const buildDeck = () =>
    shuffle(items).map((item) =>
      buildQuestion(item, items, monoTerm, monoAnswer)
    );

  const [deck, setDeck]             = useState(() => buildDeck());
  const [index, setIndex]           = useState(0);
  const [selected, setSelected]     = useState(null);
  const [correct, setCorrect]       = useState(0);
  const [missed, setMissed]         = useState(0);

  useEffect(() => {
    setDeck(buildDeck());
    setIndex(0);
    setSelected(null);
    setCorrect(0);
    setMissed(0);
  }, [category]);

  const total    = deck.length;
  const progress = (index / total) * 100;
  const question = deck[index];
  const answered = selected !== null;

  function handleSelect(choice) {
    if (answered) return;
    setSelected(choice);
  }

  function handleNext() {
    const isCorrect = selected === question.correct;
    const newCorrect = isCorrect ? correct + 1 : correct;
    const newMissed  = isCorrect ? missed      : missed + 1;

    if (index + 1 >= total) {
      onFinish({ correct: newCorrect, missed: newMissed, total });
      return;
    }
    setCorrect(newCorrect);
    setMissed(newMissed);
    setSelected(null);
    setIndex((i) => i + 1);
  }

  function choiceClass(choice) {
    if (!answered) return 'choice-btn';
    if (choice === question.correct) return 'choice-btn choice-correct';
    if (choice === selected)         return 'choice-btn choice-wrong';
    return 'choice-btn choice-dimmed';
  }

  return (
    <div className="page study-page">
      <div className="study-header">
        <button className="back-btn" onClick={onBack}>← Categories</button>
        <div className="study-title-row">
          <h2 className="study-title" style={{ color: category.unitColor }}>{category.name}</h2>
          <span className="study-mode-tag">Definition Quiz</span>
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

      <div className="defquiz-card">
        <p className="defquiz-direction">
          {question.promptMono
            ? 'What is the definition of this term?'
            : 'Which term matches this definition?'}
        </p>
        <div className={`defquiz-prompt ${question.promptMono ? 'mono' : ''}`}>
          {question.prompt}
        </div>

        <div className="choices-grid">
          {question.choices.map((choice, i) => (
            <button
              key={i}
              className={choiceClass(choice)}
              style={{ '--choice-color': category.unitColor }}
              onClick={() => handleSelect(choice)}
            >
              <span className={question.answerMono ? 'mono' : ''}>
                {choice}
              </span>
            </button>
          ))}
        </div>

        {answered && (
          <button
            className="next-btn"
            style={{ background: category.unitColor }}
            onClick={handleNext}
          >
            {index + 1 >= total ? 'See Results →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}
