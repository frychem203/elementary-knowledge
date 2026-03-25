export default function PathSelector({ onSelectPath }) {
  return (
    <div className="page home-page">
      <header className="home-header">
        <div className="home-logo">⚗️</div>
        <h1 className="home-title">
          <span className="title-element">ELEMENT</span>
          <span className="title-ary">ary</span>
          <span className="title-knowledge"> Knowledge</span>
        </h1>
        <p className="home-subtitle">High school chemistry made simple. How do you want to study today?</p>
      </header>

      <div className="path-grid">
        {/* ── Path 1: Study by Category ─────────────────────────────────── */}
        <button
          className="path-card path-card--category"
          onClick={() => onSelectPath('category')}
        >
          <div className="path-card-body">
            <div className="path-icon">📚</div>
            <div className="path-text">
              <h2 className="path-title">Study by Category</h2>
              <p className="path-desc">
                Focus on one topic at a time. Pick a unit, then choose a
                specific category and study mode.
              </p>
            </div>
            <span className="path-badge path-badge--category">Focused practice</span>
          </div>
          <span className="path-arrow">→</span>
        </button>

        {/* ── Path 2: Study by Unit ─────────────────────────────────────── */}
        <button
          className="path-card path-card--unit"
          onClick={() => onSelectPath('unit')}
        >
          <div className="path-card-body">
            <div className="path-icon">🎯</div>
            <div className="path-text">
              <h2 className="path-title">Study by Unit</h2>
              <p className="path-desc">
                Mix every category from a unit into one session. Questions are
                interleaved randomly — perfect for test-prep!
              </p>
            </div>
            <span className="path-badge path-badge--unit">Test-style practice</span>
          </div>
          <span className="path-arrow">→</span>
        </button>
      </div>
    </div>
  );
}
