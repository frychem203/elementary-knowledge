import { UNITS } from '../data/index';

const modeLabels = {
  flashcard:       '🃏 Flashcards',
  match:           '🔗 Match the Term',
  quiz:            '🔬 Equipment Quiz',
  'definition-quiz': '📝 Definition Quiz',
};

const modeDescriptions = {
  flashcard:       'Flip cards & self-grade',
  match:           'Drag & match pairs',
  quiz:            'Identify by image',
  'definition-quiz': 'Multiple choice',
};

export default function CategorySelector({ unitId, categories, onSelectMode, onBack }) {
  const unit = UNITS.find((u) => u.id === unitId);

  return (
    <div className="page category-page">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Units</button>
        <div className="page-header-text">
          <h2 className="page-title" style={{ color: unit?.color }}>Unit {unitId}: {unit?.name}</h2>
          <p className="page-desc">
            {unitId > 1
              ? `Cumulative — includes all content from Units 1–${unitId}`
              : 'Choose a category below to start studying'}
          </p>
        </div>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            style={{ '--cat-color': cat.unitColor }}
          >
            <div className="category-card-header">
              <span
                className="category-unit-badge"
                style={{ background: cat.unitColor }}
              >
                Unit {cat.unitId}
              </span>
              <h3 className="category-card-name">{cat.name}</h3>
              <span className="category-item-count">{cat.items.length} items</span>
            </div>

            <div className="category-modes">
              {cat.modes.map((mode) => (
                <button
                  key={mode}
                  className="mode-btn"
                  style={{ '--mode-color': cat.unitColor }}
                  onClick={() => onSelectMode(cat, mode)}
                >
                  <span className="mode-btn-label">{modeLabels[mode]}</span>
                  <span className="mode-btn-desc">{modeDescriptions[mode]}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
