import { useState, useEffect } from 'react';
import { shuffle } from '../utils';

// Resolve per-item mono override, falling back to category-level default.
function resolveMono(item, field, catDefault) {
  return item[field] !== undefined ? item[field] : catDefault;
}

// Build one question from `item`.
// Distractors are pulled from same-type items whenever possible (≥3 available),
// preventing symbol choices from appearing alongside prose-definition choices.
function buildQuestion(item, allItems, catMonoTerm, catMonoAnswer) {
  const mt = resolveMono(item, 'monoTerm',   catMonoTerm);
  const ma = resolveMono(item, 'monoAnswer', catMonoAnswer);

  const termFirst   = Math.random() > 0.5;
  const prompt      = termFirst ? item.term   : item.answer;
  const promptMono  = termFirst ? mt : ma;
  const correctText = termFirst ? item.answer : item.term;
  const correctMono = termFirst ? ma : mt;

  // ── Distractor pool: prefer same type, fall back to all others ────────────
  const itemType      = item.type || 'definition';
  const sameTypePool  = allItems.filter((i) => i !== item && (i.type || 'definition') === itemType);
  const distractorPool = sameTypePool.length >= 3
    ? sameTypePool
    : allItems.filter((i) => i !== item);

  const wrongItems = shuffle(distractorPool).slice(0, 3);
  const wrongs = wrongItems.map((i) => ({
    text: termFirst ? i.answer : i.term,
    mono: termFirst
      ? resolveMono(i, 'monoAnswer', catMonoAnswer)
      : resolveMono(i, 'monoTerm',   catMonoTerm),
  }));

  const choices = shuffle([{ text: correctText, mono: correctMono }, ...wrongs]);

  return { prompt, promptMono, correctText, choices, termFirst, itemType };
}

// Direction label — depends on which side is shown and what type the answer is.
function directionLabel(termFirst, itemType) {
  if (termFirst  && itemType === 'symbol')     return 'Which symbol matches this term?';
  if (termFirst)                               return 'What does this term mean?';
  if (itemType === 'symbol')                   return 'Which name matches this symbol?';
  return 'Which term matches this definition?';
}

export default function DefinitionQuiz({ category, onFinish, onBack }) {
  const { items, monoTerm, monoAnswer } = category;

  const buildDeck = () =>
    shuffle(items).map((item) => buildQuestion(item, items, monoTerm, monoAnswer));

  const [deck, setDeck]         = useState(() => buildDeck());
  const [index, setIndex]       = useState(0);
  const [selected, setSelected] = useState(null); // stores the text string of the selected choice
  const [correct, setCorrect]   = useState(0);
  const [missed, setMissed]     = useState(0);

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

  function handleSelect(text) {
    if (answered) return;
    setSelected(text);
  }

  function handleNext() {
    const isCorrect  = selected === question.correctText;
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

  function choiceClass(text) {
    if (!answered)                         return 'choice-btn';
    if (text === question.correctText)     return 'choice-btn choice-correct';
    if (text === selected)                 return 'choice-btn choice-wrong';
    return 'choice-btn choice-dimmed';
  }

  return (
    <div className="page study-page">
      <div className="study-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="study-title-row">
          <h2 className="study-title">{category.name}</h2>
          <span className="study-mode-tag">Definition Quiz</span>
        </div>
        <div className="progress-row">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
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
          {directionLabel(question.termFirst, question.itemType)}
        </p>

        <div className={`defquiz-prompt ${question.promptMono ? 'mono' : ''}`}>
          {question.prompt}
        </div>

        <div className="choices-grid">
          {question.choices.map((choice, i) => (
            <button
              key={i}
              className={choiceClass(choice.text)}
              onClick={() => handleSelect(choice.text)}
            >
              {/* Each choice knows its own mono status */}
              <span className={choice.mono ? 'mono' : ''}>{choice.text}</span>
            </button>
          ))}
        </div>

        {answered && (
          <button className="next-btn" onClick={handleNext}>
            {index + 1 >= total ? 'See Results →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}
