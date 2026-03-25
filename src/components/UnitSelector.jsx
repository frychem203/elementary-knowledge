import { UNITS } from '../data/index';

const UNIT_SUBTITLES = {
  1: 'SI Units · Lab Equipment',
  2: '+ States of Matter',
  3: '+ Polyatomic Ions',
  4: '+ Common Substances',
  5: '+ Diatomic Gases',
  6: '+ Stoichiometry Terms',
  7: '+ Heat Energy Terms',
};

const UNIT_ITEM_COUNTS = {
  1: '16 items',
  2: '20 items',
  3: '26 items',
  4: '32 items',
  5: '38 items',
  6: '44 items',
  7: '52 items',
};

export default function UnitSelector({ path, onSelectUnit, onBack }) {
  const isCategory = path === 'category';

  return (
    <div className="page home-page">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Home</button>
        <div className="page-header-text">
          <h2 className="page-title">
            {isCategory ? '📚 Study by Category' : '🎯 Study by Unit'}
          </h2>
          <p className="page-desc">
            {isCategory
              ? 'Select a unit — then choose a category and study mode.'
              : 'Select a unit — all its categories will be mixed together.'}
          </p>
        </div>
      </div>

      <div className="units-grid">
        {UNITS.map((unit) => (
          <button
            key={unit.id}
            className="unit-card"
            style={{ '--unit-color': unit.color }}
            onClick={() => onSelectUnit(unit.id)}
          >
            <div className="unit-card-number">UNIT {unit.id}</div>
            <div className="unit-card-name">{unit.name}</div>
            <div className="unit-card-subtitle">{UNIT_SUBTITLES[unit.id]}</div>
            <div className="unit-card-meta">
              <span className="unit-card-count">{UNIT_ITEM_COUNTS[unit.id]}</span>
              <span className="unit-card-cumulative">
                {unit.id > 1 ? `Cumulative (Units 1–${unit.id})` : 'Introductory unit'}
              </span>
            </div>
            <div className="unit-card-arrow">→</div>
          </button>
        ))}
      </div>
    </div>
  );
}
