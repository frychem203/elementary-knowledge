import { useState } from 'react';
import { shuffle } from '../utils';

const BATCH_SIZE = 6;

function buildBatch(items, batchIndex) {
  const start   = batchIndex * BATCH_SIZE;
  const slice   = items.slice(start, start + BATCH_SIZE);
  const terms   = shuffle(slice.map((_, i) => i));
  const answers = shuffle(slice.map((_, i) => i));
  return { slice, terms, answers };
}

function monoClass(item, side, catMono) {
  const flag = item[side] !== undefined ? item[side] : catMono;
  return flag ? 'mono' : '';
}

export default function MatchTheTerm({ category, onFinish, onBack }) {
  const { items, monoTerm, monoAnswer } = category;

  const [allItems]  = useState(() => shuffle(items));
  const [batchIndex, setBatchIndex] = useState(0);
  const [batch, setBatch] = useState(() => buildBatch(shuffle(items), 0));

  const batchCount = Math.ceil(allItems.length / BATCH_SIZE);

  const [selectedTerm,   setSelectedTerm]   = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [matched,        setMatched]        = useState(new Set());
  const [flash,          setFlash]          = useState(null);
  const [totalCorrect,   setTotalCorrect]   = useState(0);
  const [batchComplete,  setBatchComplete]  = useState(false);

  function resetBatch(newBatchIndex) {
    setBatch(buildBatch(allItems, newBatchIndex));
    setSelectedTerm(null);
    setSelectedAnswer(null);
    setMatched(new Set());
    setFlash(null);
    setBatchComplete(false);
    setBatchIndex(newBatchIndex);
  }

  function handleTermClick(posIdx) {
    if (flash) return;
    const sliceIdx = batch.terms[posIdx];
    if (matched.has(sliceIdx)) return;
    setSelectedTerm(posIdx);
    tryMatch(posIdx, selectedAnswer, sliceIdx,
      selectedAnswer !== null ? batch.answers[selectedAnswer] : null);
  }

  function handleAnswerClick(posIdx) {
    if (flash) return;
    const sliceIdx = batch.answers[posIdx];
    if (matched.has(sliceIdx)) return;
    setSelectedAnswer(posIdx);
    tryMatch(selectedTerm, posIdx,
      selectedTerm !== null ? batch.terms[selectedTerm] : null, sliceIdx);
  }

  function tryMatch(termPos, ansPos, termSliceIdx, ansSliceIdx) {
    if (termPos === null || ansPos === null) return;
    if (termSliceIdx === null || ansSliceIdx === null) return;

    if (termSliceIdx === ansSliceIdx) {
      const newMatched = new Set(matched).add(termSliceIdx);
      setMatched(newMatched);
      setSelectedTerm(null);
      setSelectedAnswer(null);

      if (newMatched.size === batch.slice.length) {
        setTotalCorrect((n) => n + batch.slice.length);
        setBatchComplete(true);
      }
    } else {
      setFlash({ termPos, ansPos });
      setTimeout(() => {
        setFlash(null);
        setSelectedTerm(null);
        setSelectedAnswer(null);
      }, 600);
    }
  }

  function handleNextBatch() {
    const nextBatch = batchIndex + 1;
    if (nextBatch >= batchCount) {
      onFinish({ correct: totalCorrect + batch.slice.length, missed: 0,
                 total:   totalCorrect + batch.slice.length });
    } else {
      resetBatch(nextBatch);
    }
  }

  const total     = allItems.length;
  const doneItems = batchIndex * BATCH_SIZE + matched.size;
  const progress  = (doneItems / total) * 100;

  const { slice, terms, answers } = batch;

  function termClass(posIdx) {
    const si = terms[posIdx];
    if (matched.has(si))                  return 'match-tile match-tile--matched';
    if (flash && flash.termPos === posIdx) return 'match-tile match-tile--wrong';
    if (selectedTerm === posIdx)           return 'match-tile match-tile--selected';
    return 'match-tile';
  }

  function answerClass(posIdx) {
    const si = answers[posIdx];
    if (matched.has(si))                  return 'match-tile match-tile--matched';
    if (flash && flash.ansPos === posIdx)  return 'match-tile match-tile--wrong';
    if (selectedAnswer === posIdx)         return 'match-tile match-tile--selected';
    return 'match-tile';
  }

  return (
    <div className="page study-page">
      <div className="study-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="study-title-row">
          <h2 className="study-title">{category.name}</h2>
          <span className="study-mode-tag">Match the Term</span>
        </div>
        <div className="progress-row">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">
            {batchCount > 1
              ? `Set ${batchIndex + 1} of ${batchCount}`
              : `${matched.size} / ${slice.length} matched`}
          </span>
        </div>
      </div>

      {!batchComplete ? (
        <>
          <p className="match-instruction">
            Click a term, then click its matching answer. Correct pairs will lock in.
          </p>
          <div className="match-grid">
            <div className="match-col">
              {terms.map((sliceIdx, posIdx) => (
                <button
                  key={posIdx}
                  className={termClass(posIdx)}
                  onClick={() => handleTermClick(posIdx)}
                  disabled={matched.has(sliceIdx)}
                >
                  <span className={monoClass(slice[sliceIdx], 'monoTerm', monoTerm)}>
                    {slice[sliceIdx].term}
                  </span>
                </button>
              ))}
            </div>
            <div className="match-col">
              {answers.map((sliceIdx, posIdx) => (
                <button
                  key={posIdx}
                  className={answerClass(posIdx)}
                  onClick={() => handleAnswerClick(posIdx)}
                  disabled={matched.has(sliceIdx)}
                >
                  <span className={monoClass(slice[sliceIdx], 'monoAnswer', monoAnswer)}>
                    {slice[sliceIdx].answer}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="match-complete">
          <div className="match-complete-icon">🎉</div>
          <h3 className="match-complete-title">
            {batchIndex + 1 < batchCount ? 'Set Complete!' : 'All Matched!'}
          </h3>
          <p className="match-complete-sub">
            You matched all {slice.length} pairs correctly.
          </p>
          <button className="next-btn" onClick={handleNextBatch}>
            {batchIndex + 1 < batchCount ? 'Next Set →' : 'See Results →'}
          </button>
        </div>
      )}
    </div>
  );
}
