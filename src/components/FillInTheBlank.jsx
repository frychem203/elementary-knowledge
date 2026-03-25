import { useState, useRef, useEffect } from 'react';

function isMatch(input, correctName) {
  const inp = input.trim().toLowerCase();
  const cor = correctName.toLowerCase();
  if (inp === cor) return true;
  if (inp.length >= 4 && cor.includes(inp)) return true;
  const words = inp.split(/\s+/).filter(Boolean);
  if (words.length > 0 && words.every((w) => cor.includes(w) && w.length >= 3)) return true;
  return false;
}

// unitColor prop is no longer used — colors are driven by CSS only.
export default function FillInTheBlank({ item, onGrade }) {
  const [value, setValue]         = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef(null);

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

      <div className="equipment-meta">
        <div className="equipment-use">
          <span className="meta-label">Use:</span> {item.use}
        </div>
        <div className="equipment-unit">
          <span className="meta-label">Measures:</span>{' '}
          {item.unit ?? 'No unit of measure'}
        </div>
      </div>

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
          />
          <button
            className="fitb-check-btn"
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
          <button className="fitb-next-btn" onClick={() => onGrade(isCorrect)}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
