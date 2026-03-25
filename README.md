# ELEMENTary Knowledge

A high school chemistry study tool built with Vite + React. Study SI units, lab equipment, states of matter, polyatomic ions, common substances, diatomic gases, stoichiometry terms, and heat energy terms — all in one app.

## Features

- **7 cumulative units** — each unit includes all content from previous units
- **4 study modes:**
  - 🃏 **Flashcards** — flip cards with self-grading (both directions randomized)
  - 🔬 **Equipment Quiz** — identify lab equipment from its image
  - 📝 **Definition Quiz** — multiple choice, both term→definition and definition→term
  - 🔗 **Match the Term** — click-to-match pairs game
- Progress bar and live score on every session
- Results screen with percentage, counts, and an encouraging message

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add equipment images

Before running, copy the 12 equipment images into:

```
public/images/equipment/
```

**Required filenames** (exact names matter):

| Filename | Equipment |
|---|---|
| `beaker.jpeg` | Beaker |
| `graduated_cylinder.jpeg` | Graduated Cylinder |
| `erlenmeyer_flask.jpg` | Erlenmeyer Flask |
| `test_tube.jpg` | Test Tube |
| `spatula.png` | Spatula / Scoopula |
| `pipette.png` | Pipette |
| `digital_balance.jpeg` | Digital Balance / Scale |
| `hot_plate.png` | Hot Plate |
| `bunsen_burner.png` | Bunsen Burner |
| `glass_stir_rod.png` | Glass Stir Rod |
| `evaporating_dish.png` | Evaporating Dish |
| `thermometer.png` | Thermometer |

> The app will display a placeholder emoji if an image is missing — all other modes still work fine without images.

### 3. Run the dev server

```bash
npm run dev
```

Then open **http://localhost:5173** in your browser.

## Project Structure

```
elementary-knowledge/
├── public/
│   └── images/
│       └── equipment/        ← copy 12 equipment images here
├── src/
│   ├── data/
│   │   └── index.js          ← all study content + getCumulativeCategories()
│   ├── utils.js              ← Fisher-Yates shuffle
│   ├── components/
│   │   ├── UnitSelector.jsx       home screen — 7 unit cards
│   │   ├── CategorySelector.jsx   category + mode picker
│   │   ├── Flashcard.jsx          flashcard mode
│   │   ├── FillInTheBlank.jsx     equipment name input (used by QuizMode)
│   │   ├── QuizMode.jsx           equipment quiz orchestrator
│   │   ├── DefinitionQuiz.jsx     multiple-choice definition quiz
│   │   ├── MatchTheTerm.jsx       click-to-match pairs game
│   │   └── Results.jsx            score + encouragement screen
│   ├── App.jsx               navigation state machine
│   ├── App.css               all styles (plain CSS, no Tailwind)
│   └── main.jsx              entry point
└── package.json
```

## Tech Stack

- [Vite](https://vite.dev/) — build tool
- [React 19](https://react.dev/) — UI
- Plain CSS — no Tailwind, no UI libraries
- [Google Fonts](https://fonts.google.com/) — Nunito + Space Mono
