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

// UnitSelector is only used for Path 2 (Study by Unit).
// The student picks a unit; all its categories will be mixed into one session.
export default function UnitSelector({ onSelectUnit, onBack }) {
  return (
    <div className="page home-page">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Home</button>
        <div className="page-header-text">
          <h2 className="page-title">🎯 Study by Unit</h2>
          <p className="page-desc">
            Select a unit — all its categories will be mixed into one session.
          </p>
        </div>
      </div>

      <div className="units-grid">
        {UNITS.map((unit) => (
          <button
            key={unit.id}
            className="unit-card"
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
