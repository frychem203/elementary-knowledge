// ─────────────────────────────────────────────────────────────────────────────
// ELEMENTary Knowledge — all study content
//
// Per-item fields:
//   monoTerm   : override category-level monoTerm  (true = Space Mono font)
//   monoAnswer : override category-level monoAnswer
//   type       : 'symbol'     — answer is a formula / symbol / equation
//                'definition' — answer is a prose English definition
//
// type is used by DefinitionQuiz to ensure wrong-answer choices come from
// items of the same type (symbols vs. definitions), preventing mismatched
// distractors in mixed categories.
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
        name: 'SI Units & Measurement',
        modes: ['flashcard', 'match', 'definition-quiz'],
        monoTerm: false,
        monoAnswer: false,
        items: [
          // ── Original SI unit items (type: definition) ──────────────────────
          { term: 'milliliter (mL)', answer: 'Unit of measurement for volume',       type: 'definition' },
          { term: 'gram (g)',        answer: 'Unit of measurement for mass',          type: 'definition' },
          { term: 'centimeter (cm)', answer: 'Unit of measurement for length',        type: 'definition' },
          { term: 'Celsius (°C)',    answer: 'Unit of measurement for temperature',   type: 'definition' },
          // ── New vocabulary terms ───────────────────────────────────────────
          {
            term: 'Independent Variable',
            answer: 'Variable that is controlled or manipulated by the experimenter. Goes on the x-axis.',
            type: 'definition',
          },
          {
            term: 'Dependent Variable',
            answer: 'Responding variable that is measured or observed by the experimenter. Goes on the y-axis.',
            type: 'definition',
          },
          {
            term: 'Density',
            answer: 'Amount of mass per unit of volume',
            type: 'definition',
          },
          {
            term: 'Density formula',
            answer: 'D = M/V',
            type: 'symbol',
            monoAnswer: true,   // formula — render in Space Mono
          },
        ],
      },
      {
        id: 'lab-equipment',
        name: 'Lab Equipment',
        modes: ['quiz'],
        monoTerm: false,
        monoAnswer: false,
        items: [
          // unit: null  →  "No unit of measure" displayed in Equipment Quiz
          { name: 'Beaker',                 image: 'beaker.jpeg',             use: 'Hold and mix substances',       unit: null },
          { name: 'Graduated Cylinder',     image: 'graduated_cylinder.jpeg', use: 'Measure volume accurately',     unit: 'milliliters (mL)' },
          { name: 'Erlenmeyer Flask',       image: 'erlenmeyer_flask.jpg',    use: 'Hold, swirl, mix substances',   unit: null },
          { name: 'Test Tube',              image: 'test_tube.jpg',           use: 'Hold small amounts',            unit: null },
          { name: 'Spatula / Scoopula',     image: 'spatula.png',             use: 'Scoop solid chemicals',         unit: null },
          { name: 'Pipette',                image: 'pipette.png',             use: 'Transfer small liquid amounts', unit: null },
          { name: 'Digital Balance / Scale',image: 'digital_balance.jpeg',    use: 'Measure mass of substances',    unit: 'grams (g)' },
          { name: 'Hot Plate',              image: 'hot_plate.png',           use: 'Heat substances slowly',        unit: null },
          { name: 'Bunsen Burner',          image: 'bunsen_burner.png',       use: 'Heat with high-temp flame',     unit: null },
          { name: 'Glass Stir Rod',         image: 'glass_stir_rod.png',      use: 'Stir substances',               unit: null },
          { name: 'Evaporating Dish',       image: 'evaporating_dish.png',    use: 'Heat and evaporate mixtures',   unit: null },
          { name: 'Thermometer',            image: 'thermometer.png',         use: 'Measure temperature',           unit: 'degrees Celsius (°C)' },
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
        modes: ['flashcard', 'match', 'definition-quiz'],
        monoTerm: false,
        monoAnswer: true,   // default: answers are symbols like (s), (l)
        items: [
          // ── Original state-symbol items ────────────────────────────────────
          { term: 'Solid',                        answer: '(s)',  type: 'symbol' },
          { term: 'Liquid',                       answer: '(l)',  type: 'symbol' },
          { term: 'Gas',                          answer: '(g)',  type: 'symbol' },
          { term: 'Aqueous (dissolved in water)', answer: '(aq)', type: 'symbol' },
          // ── New vocabulary terms (prose answers — override monoAnswer) ─────
          {
            term: 'Period',
            answer: 'A row on the periodic table. Indicates the number of shells in an atom.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Group',
            answer: 'A column on the periodic table. Indicates the number of valence electrons in an atom.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Aqueous',
            answer: 'When a solid has been dissolved in water creating a solution.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Atomic number',
            answer: 'The number of protons in an atom.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Atom',
            answer: 'The smallest unit of an element on the periodic table.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Molecule',
            answer: 'A group of two or more atoms held together by atomic bonds.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Isotope',
            answer: 'Forms of an element that have different numbers of neutrons.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Valence electron',
            answer: 'Electrons that are on the outermost shell of an atom.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Coulombic attraction',
            answer: 'The attraction between oppositely charged particles.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Ionization energy',
            answer: 'Amount of energy required to remove an electron from an atom.',
            type: 'definition', monoAnswer: false,
          },
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
        modes: ['flashcard', 'match', 'definition-quiz'],
        monoTerm: false,
        monoAnswer: true,   // default: answers are ion formulas like (OH)⁻¹
        items: [
          // ── Original polyatomic ion items ──────────────────────────────────
          { term: 'Hydroxide', answer: '(OH)⁻¹',  type: 'symbol' },
          { term: 'Nitrate',   answer: '(NO₃)⁻¹', type: 'symbol' },
          { term: 'Carbonate', answer: '(CO₃)⁻²', type: 'symbol' },
          { term: 'Sulfate',   answer: '(SO₄)⁻²', type: 'symbol' },
          { term: 'Phosphate', answer: '(PO₄)⁻³', type: 'symbol' },
          { term: 'Ammonium',  answer: '(NH₄)⁺¹', type: 'symbol' },
          // ── New vocabulary terms ───────────────────────────────────────────
          {
            term: 'Ion',
            answer: 'An atom with a charge.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Polyatomic ion',
            answer: 'A group of two or more atoms with a charge.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Ionic bond',
            answer: 'Chemical bond between a metal and a nonmetal where valence electrons are transferred.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Covalent bond',
            answer: 'Chemical bond between nonmetal atoms where valence electrons are shared.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Molecular formula',
            answer: 'Notation that shows the number and type of atoms in a molecule.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Structural formula',
            answer: 'Drawings that use lines to represent the bonds between atoms.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Lewis dot structure',
            answer: 'Drawing that uses dots to represent the valence electrons in a molecule.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Electronegativity',
            answer: 'Measure of how strongly an atom can attract electrons.',
            type: 'definition', monoAnswer: false,
          },
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
        modes: ['flashcard', 'match', 'definition-quiz'],
        monoTerm: false,
        monoAnswer: true,   // default: answers are chemical formulas like H₂O
        items: [
          // ── Original substance-formula items ──────────────────────────────
          { term: 'Water',             answer: 'H₂O',  type: 'symbol' },
          { term: 'Carbon dioxide',    answer: 'CO₂',  type: 'symbol' },
          { term: 'Methane',           answer: 'CH₄',  type: 'symbol' },
          { term: 'Hydrogen peroxide', answer: 'H₂O₂', type: 'symbol' },
          { term: 'Hydrochloric acid', answer: 'HCl',  type: 'symbol' },
          { term: 'Sodium Hydroxide',  answer: 'NaOH', type: 'symbol' },
          // ── New vocabulary terms ───────────────────────────────────────────
          {
            term: 'Polar covalent bond',
            answer: 'A bond where two atoms share a pair of electrons unequally.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Nonpolar covalent bond',
            answer: 'A bond where two atoms share a pair of electrons equally.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'IMF',
            answer: 'The attractive force between molecules.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Exothermic',
            answer: 'When a reaction or process releases heat.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Endothermic',
            answer: 'When a reaction or process absorbs heat.',
            type: 'definition', monoAnswer: false,
          },
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
        modes: ['flashcard', 'match', 'definition-quiz'],
        monoTerm: false,
        monoAnswer: true,   // default: answers are formulas like H₂ (g)
        items: [
          // ── Original diatomic items ────────────────────────────────────────
          { term: 'Hydrogen gas', answer: 'H₂ (g)',  type: 'symbol' },
          { term: 'Oxygen gas',   answer: 'O₂ (g)',  type: 'symbol' },
          { term: 'Nitrogen gas', answer: 'N₂ (g)',  type: 'symbol' },
          { term: 'Chlorine gas', answer: 'Cl₂ (g)', type: 'symbol' },
          { term: 'Bromine gas',  answer: 'Br₂ (g)', type: 'symbol' },
          { term: 'Iodine gas',   answer: 'I₂ (g)',  type: 'symbol' },
          // ── New vocabulary terms ───────────────────────────────────────────
          {
            term: 'Chemical change',
            answer: 'Reaction that produces a new substance(s).',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Physical change',
            answer: 'Process that alters the state or appearance of a substance but remains chemically the same substance.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Coefficient',
            answer: 'Number placed in front of a chemical formula that represents the number of molecules or moles.',
            type: 'definition', monoAnswer: false,
          },
          {
            term: 'Subscript',
            answer: "Small number written to the lower right of an element's symbol that represents the number of atoms.",
            type: 'definition', monoAnswer: false,
          },
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
          { term: '1 mole',                  answer: '6.02 × 10²³ atoms (single element) or molecules (2+ elements bonded) of ANYTHING', type: 'definition' },
          { term: 'molar mass',              answer: 'g/mol — the mass of one mole of a substance',                                        type: 'definition' },
          { term: 'mole-to-mole conversion', answer: '1-step conversion using mole ratio / coefficients from a balanced equation',          type: 'definition' },
          { term: 'gram-to-gram conversion', answer: '3-step conversion',                                                                   type: 'definition' },
          { term: 'gram-to-mole conversion', answer: 'Divide by molar mass from the periodic table',                                        type: 'definition' },
          { term: 'mole-to-gram conversion', answer: 'Multiply by molar mass from the periodic table',                                      type: 'definition' },
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
        monoTerm: true,     // most terms are single-letter symbols (q, m, c, ΔT)
        monoAnswer: false,
        items: [
          { term: 'q',           answer: 'Heat, measured in Joules (J)',                      type: 'definition' },
          { term: 'm',           answer: 'Mass, measured in grams (g)',                        type: 'definition' },
          { term: 'c',           answer: 'Specific heat, measured in J/g°C',                  type: 'definition' },
          { term: 'ΔT',          answer: 'Change in temperature (T_final − T_initial)',        type: 'definition' },
          { term: 'endothermic', answer: 'Heat energy going IN to a reaction',                 type: 'definition' },
          { term: 'exothermic',  answer: 'Heat energy going OUT of a reaction',                type: 'definition' },
          { term: 'heat',        answer: 'Transfer of ENERGY between molecules',               type: 'definition' },
          { term: 'temperature', answer: 'Measures the MOVEMENT of molecules',                 type: 'definition' },
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
