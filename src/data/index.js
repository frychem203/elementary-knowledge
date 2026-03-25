// ─────────────────────────────────────────────────────────────────────────────
// ELEMENTary Knowledge — all study content
// monoTerm  : true if the TERM should render in Space Mono
// monoAnswer: true if the ANSWER should render in Space Mono
// ─────────────────────────────────────────────────────────────────────────────

export const UNITS = [
  // ── UNIT 1 ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Measurement & Equipment',
    color: '#1D9E75',
    categories: [
      {
        id: 'si-units',
        name: 'SI Units',
        modes: ['flashcard', 'match'],
        monoTerm: false,
        monoAnswer: false,
        items: [
          { term: 'milliliter (mL)', answer: 'Unit of measurement for volume' },
          { term: 'gram (g)',        answer: 'Unit of measurement for mass' },
          { term: 'centimeter (cm)', answer: 'Unit of measurement for length' },
          { term: 'Celsius (°C)',    answer: 'Unit of measurement for temperature' },
        ],
      },
      {
        id: 'lab-equipment',
        name: 'Lab Equipment',
        modes: ['quiz'],
        monoTerm: false,
        monoAnswer: false,
        items: [
          { name: 'Beaker',                image: 'beaker.jpeg',            use: 'Hold and mix substances',      unit: 'milliliters (mL)' },
          { name: 'Graduated Cylinder',    image: 'graduated_cylinder.jpeg',use: 'Measure volume accurately',    unit: 'milliliters (mL)' },
          { name: 'Erlenmeyer Flask',      image: 'erlenmeyer_flask.jpg',   use: 'Hold, swirl, mix substances',  unit: 'milliliters (mL)' },
          { name: 'Test Tube',             image: 'test_tube.jpg',          use: 'Hold small amounts',           unit: null },
          { name: 'Spatula / Scoopula',    image: 'spatula.png',            use: 'Scoop solid chemicals',        unit: null },
          { name: 'Pipette',               image: 'pipette.png',            use: 'Transfer small liquid amounts',unit: 'milliliters (mL)' },
          { name: 'Digital Balance / Scale',image: 'digital_balance.jpeg',  use: 'Measure mass of substances',   unit: 'grams (g)' },
          { name: 'Hot Plate',             image: 'hot_plate.png',          use: 'Heat substances slowly',       unit: null },
          { name: 'Bunsen Burner',         image: 'bunsen_burner.png',      use: 'Heat with high-temp flame',    unit: null },
          { name: 'Glass Stir Rod',        image: 'glass_stir_rod.png',     use: 'Stir substances',              unit: null },
          { name: 'Evaporating Dish',      image: 'evaporating_dish.png',   use: 'Heat and evaporate mixtures',  unit: null },
          { name: 'Thermometer',           image: 'thermometer.png',        use: 'Measure temperature',          unit: 'degrees Celsius (°C)' },
        ],
      },
    ],
  },

  // ── UNIT 2 ──────────────────────────────────────────────────────────────────
  {
    id: 2,
    name: 'States of Matter',
    color: '#7F77DD',
    categories: [
      {
        id: 'states-of-matter',
        name: 'States of Matter',
        modes: ['flashcard', 'match'],
        monoTerm: false,
        monoAnswer: true,
        items: [
          { term: 'Solid',                       answer: '(s)' },
          { term: 'Liquid',                      answer: '(l)' },
          { term: 'Gas',                         answer: '(g)' },
          { term: 'Aqueous (dissolved in water)', answer: '(aq)' },
        ],
      },
    ],
  },

  // ── UNIT 3 ──────────────────────────────────────────────────────────────────
  {
    id: 3,
    name: 'Polyatomic Ions',
    color: '#D85A30',
    categories: [
      {
        id: 'polyatomic-ions',
        name: 'Polyatomic Ions',
        modes: ['flashcard', 'match'],
        monoTerm: false,
        monoAnswer: true,
        items: [
          { term: 'Hydroxide',  answer: '(OH)⁻¹' },
          { term: 'Nitrate',    answer: '(NO₃)⁻¹' },
          { term: 'Carbonate',  answer: '(CO₃)⁻²' },
          { term: 'Sulfate',    answer: '(SO₄)⁻²' },
          { term: 'Phosphate',  answer: '(PO₄)⁻³' },
          { term: 'Ammonium',   answer: '(NH₄)⁺¹' },
        ],
      },
    ],
  },

  // ── UNIT 4 ──────────────────────────────────────────────────────────────────
  {
    id: 4,
    name: 'Common Substances',
    color: '#EF9F27',
    categories: [
      {
        id: 'common-substances',
        name: 'Common Substances',
        modes: ['flashcard', 'match'],
        monoTerm: false,
        monoAnswer: true,
        items: [
          { term: 'Water',              answer: 'H₂O' },
          { term: 'Carbon dioxide',     answer: 'CO₂' },
          { term: 'Methane',            answer: 'CH₄' },
          { term: 'Hydrogen peroxide',  answer: 'H₂O₂' },
          { term: 'Hydrochloric acid',  answer: 'HCl' },
          { term: 'Sodium Hydroxide',   answer: 'NaOH' },
        ],
      },
    ],
  },

  // ── UNIT 5 ──────────────────────────────────────────────────────────────────
  {
    id: 5,
    name: 'Diatomic Gases',
    color: '#378ADD',
    categories: [
      {
        id: 'diatomic-gases',
        name: 'Diatomic Gases',
        modes: ['flashcard', 'match'],
        monoTerm: false,
        monoAnswer: true,
        items: [
          { term: 'Hydrogen gas',  answer: 'H₂ (g)' },
          { term: 'Oxygen gas',    answer: 'O₂ (g)' },
          { term: 'Nitrogen gas',  answer: 'N₂ (g)' },
          { term: 'Chlorine gas',  answer: 'Cl₂ (g)' },
          { term: 'Bromine gas',   answer: 'Br₂ (g)' },
          { term: 'Iodine gas',    answer: 'I₂ (g)' },
        ],
      },
    ],
  },

  // ── UNIT 6 ──────────────────────────────────────────────────────────────────
  {
    id: 6,
    name: 'Stoichiometry Terms',
    color: '#639922',
    categories: [
      {
        id: 'stoichiometry-terms',
        name: 'Stoichiometry Terms',
        modes: ['definition-quiz'],
        monoTerm: false,
        monoAnswer: false,
        items: [
          { term: '1 mole',                   answer: '6.02 × 10²³ atoms (single element) or molecules (2+ elements bonded) of ANYTHING' },
          { term: 'molar mass',               answer: 'g/mol — the mass of one mole of a substance' },
          { term: 'mole-to-mole conversion',  answer: '1-step conversion using mole ratio / coefficients from a balanced equation' },
          { term: 'gram-to-gram conversion',  answer: '3-step conversion' },
          { term: 'gram-to-mole conversion',  answer: 'Divide by molar mass from the periodic table' },
          { term: 'mole-to-gram conversion',  answer: 'Multiply by molar mass from the periodic table' },
        ],
      },
    ],
  },

  // ── UNIT 7 ──────────────────────────────────────────────────────────────────
  {
    id: 7,
    name: 'Heat Energy Terms',
    color: '#D4537E',
    categories: [
      {
        id: 'heat-energy-terms',
        name: 'Heat Energy Terms',
        modes: ['definition-quiz'],
        monoTerm: true,
        monoAnswer: false,
        items: [
          { term: 'q',            answer: 'Heat, measured in Joules (J)' },
          { term: 'm',            answer: 'Mass, measured in grams (g)' },
          { term: 'c',            answer: 'Specific heat, measured in J/g°C' },
          { term: 'ΔT',           answer: 'Change in temperature (T_final − T_initial)' },
          { term: 'endothermic',  answer: 'Heat energy going IN to a reaction' },
          { term: 'exothermic',   answer: 'Heat energy going OUT of a reaction' },
          { term: 'heat',         answer: 'Transfer of ENERGY between molecules' },
          { term: 'temperature',  answer: 'Measures the MOVEMENT of molecules' },
        ],
      },
    ],
  },
];

// Returns every category from units 1…unitId (cumulative), each annotated
// with its parent unit's color and name.
export function getCumulativeCategories(unitId) {
  const result = [];
  for (const unit of UNITS) {
    if (unit.id <= unitId) {
      for (const cat of unit.categories) {
        result.push({ ...cat, unitColor: unit.color, unitName: unit.name, unitId: unit.id });
      }
    }
  }
  return result;
}
