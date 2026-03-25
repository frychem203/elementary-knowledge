import { UNITS } from '../data/index';

const unitSubtitles = {
  1: 'SI Units · Lab Equipment',
  2: '+ States of Matter',
  3: '+ Polyatomic Ions',
  4: '+ Common Substances',
  5: '+ Diatomic Gases',
  6: '+ Stoichiometry Terms',
  7: '+ Heat Energy Terms',
};

const unitItemCounts = {
  1: '16 items',
  2: '20 items',
  3: '26 items',
  4: '32 items',
  5: '38 items',
  6: '44 items',
  7: '52 items',
};

export default function UnitSelector({ onSelectUnit }) {
  return (
    <div className="page home-page">
      <header className="home-header">
        <div className="home-logo">⚗️</div>
        <h1 className="home-title">
          <span className="title-element">ELEMENT</span>
          <span className="title-ary">ary</span>
          <span className="title-knowledge"> Knowledge</span>
        </h1>
        <p className="home-subtitle">High school chemistry made simple. Pick a unit to start studying.</p>
      </header>

      <div className="units-grid">
        {UNITS.map((unit) => (
          <button
            key={unit.id}
            className="unit-card"
            style={{ '--unit-color': unit.color }}
            onClick={() => onSelectUnit(unit.id)}
          >
            <div className="unit-card-number">Unit {unit.id}</div>
            <div className="unit-card-name">{unit.name}</div>
            <div className="unit-card-subtitle">{unitSubtitles[unit.id]}</div>
            <div className="unit-card-meta">
              <span className="unit-card-count">{unitItemCounts[unit.id]}</span>
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
