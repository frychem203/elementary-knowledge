export default function Results({ score, returnLabel = 'Choose Another Category', onStudyAgain, onChooseAnother }) {
  const { correct, missed, total } = score;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  let message, emoji;
  if (pct >= 90) {
    emoji   = '🏆';
    message = 'Excellent! You really know your stuff!';
  } else if (pct >= 75) {
    emoji   = '👍';
    message = "Great work! A little more practice and you'll nail it.";
  } else if (pct >= 60) {
    emoji   = '📖';
    message = "Keep studying \u2014 you're getting there!";
  } else {
    emoji   = '💪';
    message = "More practice needed \u2014 you've got this!";
  }

  // Arc / ring visual
  const radius      = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset    = circumference - (pct / 100) * circumference;

  // Color based on score
  let ringColor;
  if (pct >= 90)      ringColor = '#1D9E75';
  else if (pct >= 75) ringColor = '#378ADD';
  else if (pct >= 60) ringColor = '#EF9F27';
  else                ringColor = '#D85A30';

  return (
    <div className="page results-page">
      <div className="results-card">
        <h2 className="results-heading">Session Complete!</h2>

        {/* Score ring */}
        <div className="results-ring-wrap">
          <svg className="results-ring" viewBox="0 0 120 120" width="160" height="160">
            <circle
              cx="60" cy="60" r={radius}
              fill="none"
              stroke="#e8eaf0"
              strokeWidth="10"
            />
            <circle
              cx="60" cy="60" r={radius}
              fill="none"
              stroke={ringColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px', transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div className="results-pct" style={{ color: ringColor }}>{pct}%</div>
        </div>

        {/* Counts */}
        <div className="results-counts">
          <div className="results-count-item correct">
            <span className="results-count-num">{correct}</span>
            <span className="results-count-label">Correct</span>
          </div>
          <div className="results-count-divider">/</div>
          <div className="results-count-item total">
            <span className="results-count-num">{total}</span>
            <span className="results-count-label">Total</span>
          </div>
          {missed > 0 && (
            <>
              <div className="results-count-divider">·</div>
              <div className="results-count-item missed">
                <span className="results-count-num">{missed}</span>
                <span className="results-count-label">Missed</span>
              </div>
            </>
          )}
        </div>

        {/* Message */}
        <div className="results-message">
          <span className="results-emoji">{emoji}</span>
          <p>{message}</p>
        </div>

        {/* Actions */}
        <div className="results-actions">
          <button className="results-btn results-btn-primary" onClick={onStudyAgain}>
            🔄 Study Again
          </button>
          <button className="results-btn results-btn-secondary" onClick={onChooseAnother}>
            ← {returnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
