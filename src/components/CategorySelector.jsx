import { UNITS } from '../data/index';

const MODE_LABELS = {
  flashcard:         '🃏 Flashcards',
  match:             '🔗 Match the Term',
  quiz:              '🔬 Equipment Quiz',
  'definition-quiz': '📝 Definition Quiz',
};

const MODE_DESCS = {
  flashcard:         'Flip cards & self-grade',
  match:             'Click pairs to match them',
  quiz:              'Identify by image',
  'definition-quiz': 'Multiple choice',
};

// Build the complete flat list of every category across all units,
// each annotated with its parent unit's id and name.
const ALL_CATEGORIES = UNITS.flatMap((unit) =>
  unit.categories.map((cat) => ({
    ...cat,
    unitId:   unit.id,
    unitName: unit.name,
  }))
);

export default function CategorySelector({ onSelectMode, onBack }) {
  return (
    <div className="page category-page">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Home</button>
        <div className="page-header-text">
          <h2 className="page-title">📚 Study by Category</h2>
          <p className="page-desc">Choose any category — each one stands alone.</p>
        </div>
      </div>

      <div className="categories-grid">
        {ALL_CATEGORIES.map((cat) => (
          <div key={cat.id} className="category-card">
            <div className="category-card-header">
              <span className="category-unit-badge">Unit {cat.unitId}</span>
              <h3 className="category-card-name">{cat.name}</h3>
              <span className="category-item-count">{cat.items.length} items</span>
            </div>

            <div className="category-modes">
              {cat.modes.map((mode) => (
                <button
                  key={mode}
                  className="mode-btn"
                  onClick={() => onSelectMode(cat, mode)}
                >
                  <span className="mode-btn-label">{MODE_LABELS[mode]}</span>
                  <span className="mode-btn-desc">{MODE_DESCS[mode]}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
