import { UNITS, getCumulativeCategories } from '../data/index';

// ─── Build a synthetic "category" object that combines items across the
//     entire cumulative unit for one study mode. ─────────────────────────────
function buildSyntheticCategory(unitId, mode, categories, unit) {
  const items = [];

  if (mode === 'flashcard' || mode === 'match' || mode === 'definition-quiz') {
    // Collect all term/answer items — flashcard AND definition-quiz categories
    for (const cat of categories) {
      if (cat.modes.includes('flashcard') || cat.modes.includes('definition-quiz')) {
        for (const item of cat.items) {
          // Embed per-item mono flags from the source category so mixed
          // sessions render Space Mono correctly on a card-by-card basis.
          items.push({ ...item, monoTerm: cat.monoTerm, monoAnswer: cat.monoAnswer });
        }
      }
    }
  } else if (mode === 'quiz') {
    for (const cat of categories) {
      if (cat.modes.includes('quiz')) {
        items.push(...cat.items);
      }
    }
  }

  return {
    id:            `unit-${unitId}-${mode}`,
    name:          `Unit ${unitId} — ${unit.name}`,
    items,
    // Category-level mono flags are false; per-item flags (above) take priority
    // inside Flashcard / DefinitionQuiz / MatchTheTerm.
    monoTerm:      false,
    monoAnswer:    false,
    modes:         [mode],
    unitColor:     unit.color,
    unitName:      unit.name,
    isUnitSession: true,
  };
}

const MODE_META = {
  flashcard:         { label: '🃏 Flashcards',       desc: 'Flip cards & self-grade' },
  match:             { label: '🔗 Match the Term',   desc: 'Click pairs to match them' },
  quiz:              { label: '🔬 Equipment Quiz',   desc: 'Identify lab tools by image' },
  'definition-quiz': { label: '📝 Definition Quiz',  desc: 'Multiple choice — all terms mixed' },
};

export default function UnitModeSelector({ unitId, onSelectMode, onBack }) {
  const unit       = UNITS.find((u) => u.id === unitId);
  const categories = getCumulativeCategories(unitId);

  // ── Count items per mode group ──────────────────────────────────────────
  const termCount = categories
    .filter((c) => c.modes.includes('flashcard') || c.modes.includes('definition-quiz'))
    .reduce((n, c) => n + c.items.length, 0);

  const equipCount = categories
    .filter((c) => c.modes.includes('quiz'))
    .reduce((n, c) => n + c.items.length, 0);

  // ── Available modes (need enough items for meaningful play) ─────────────
  const available = [];
  if (termCount >= 2)  available.push({ mode: 'flashcard',         count: termCount });
  if (termCount >= 2)  available.push({ mode: 'match',             count: termCount });
  if (equipCount > 0)  available.push({ mode: 'quiz',              count: equipCount });
  if (termCount >= 4)  available.push({ mode: 'definition-quiz',   count: termCount });

  function handleSelect(mode) {
    const synCat = buildSyntheticCategory(unitId, mode, categories, unit);
    onSelectMode(synCat, mode);
  }

  return (
    <div className="page category-page">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Units</button>
        <div className="page-header-text">
          <h2 className="page-title" style={{ color: unit?.color }}>
            Unit {unitId}: {unit?.name}
          </h2>
          <p className="page-desc">
            {unitId > 1
              ? `Cumulative — all content from Units 1–${unitId} mixed together`
              : 'All categories combined — choose a study mode below'}
          </p>
        </div>
      </div>

      <div className="unit-modes-grid">
        {available.map(({ mode, count }) => {
          const { label, desc } = MODE_META[mode];
          return (
            <button
              key={mode}
              className="unit-mode-card"
              style={{ '--unit-color': unit?.color }}
              onClick={() => handleSelect(mode)}
            >
              <div className="unit-mode-label">{label}</div>
              <div className="unit-mode-desc">{desc}</div>
              <span className="unit-mode-count">{count} items</span>
              <div className="unit-mode-arrow">→</div>
            </button>
          );
        })}
      </div>

      <p className="unit-mode-hint">
        ℹ️&nbsp; Questions from all categories are randomly interleaved — just like a real test!
      </p>
    </div>
  );
}
