import { useState, useRef, useEffect } from 'react';

// Checks whether a student answer is close enough to the correct name.
// Case-insensitive; also accepts a partial match of 5+ chars that
// is contained within the answer (e.g. "graduated" → "Graduated Cylinder").
function isMatch(input, correctName) {
  const inp = input.trim().toLowerCase();
  const cor = correctName.toLowerCase();
  if (inp === cor) return true;
  // Partial match: input fully contained in correct name and long enough
  if (inp.length >= 4 && cor.includes(inp)) return true;
  // Also check individual words: if every word the user typed appears in the correct name
  const words = inp.split(/\s+/).filter(Boolean);
  if (words.length > 0 && words.every((w) => cor.includes(w) && w.length >= 3)) return true;
  return false;
}

export default function FillInTheBlank({ item, onGrade, unitColor }) {
  const [value, setValue]       = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef(null);

  // Focus input on each new item
  useEffect(() => {
    setValue('');
    setSubmitted(false);
    setIsCorrect(false);
    if (inputRef.current) inputRef.current.focus();
  }, [item]);

  function handleSubmit() {
    if (submitted || !value.trim()) return;
    const correct = isMatch(value, item.name);
    setIsCorrect(correct);
    setSubmitted(true);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (!submitted) handleSubmit();
      else onGrade(isCorrect);
    }
  }

  return (
    <div className="fitb-wrapper">
      {/* Equipment image */}
      <div className="equipment-img-wrap">
        <img
          src={`/images/equipment/${item.image}`}
          alt={submitted ? item.name : 'Lab equipment — identify this item'}
          className="equipment-img"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="equipment-img-placeholder" style={{ display: 'none' }}>
          <span>🔬</span>
          <span>Image coming soon</span>
        </div>
      </div>

      {/* Use + unit */}
      <div className="equipment-meta">
        <div className="equipment-use">
          <span className="meta-label">Use:</span> {item.use}
        </div>
        <div className="equipment-unit">
          <span className="meta-label">Measures:</span>{' '}
          {item.unit ?? 'No unit of measure'}
        </div>
      </div>

      {/* Input */}
      {!submitted ? (
        <div className="fitb-input-row">
          <input
            ref={inputRef}
            type="text"
            className="fitb-input"
            placeholder="Type the equipment name…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ '--focus-color': unitColor }}
          />
          <button
            className="fitb-check-btn"
            style={{ background: unitColor }}
            onClick={handleSubmit}
            disabled={!value.trim()}
          >
            Check
          </button>
        </div>
      ) : (
        <div className={`fitb-feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
          {isCorrect ? (
            <span>✓ Correct! <strong>{item.name}</strong></span>
          ) : (
            <span>✗ The answer was <strong>{item.name}</strong></span>
          )}
          <button
            className="fitb-next-btn"
            style={{ background: unitColor }}
            onClick={() => onGrade(isCorrect)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
