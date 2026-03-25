import { useState } from 'react';
import PathSelector    from './components/PathSelector';
import UnitSelector    from './components/UnitSelector';
import CategorySelector from './components/CategorySelector';
import UnitModeSelector from './components/UnitModeSelector';
import Flashcard       from './components/Flashcard';
import QuizMode        from './components/QuizMode';
import DefinitionQuiz  from './components/DefinitionQuiz';
import MatchTheTerm    from './components/MatchTheTerm';
import Results         from './components/Results';
import { getCumulativeCategories } from './data/index';
import './App.css';

export default function App() {
  // ── Navigation ───────────────────────────────────────────────────────────
  const [screen, setScreen]   = useState('home');
  // 'home' | 'units' | 'categories' | 'unit-mode' | 'study' | 'results'

  // ── Path selection ───────────────────────────────────────────────────────
  const [path, setPath] = useState(null); // 'category' | 'unit'

  // ── Study session ────────────────────────────────────────────────────────
  const [selectedUnitId, setSelectedUnitId]     = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [studyMode, setStudyMode]               = useState(null);
  const [sessionScore, setSessionScore]         = useState(null);
  // Bump to force re-mount of the study component on "Study Again"
  const [studyKey, setStudyKey]                 = useState(0);

  const categories = selectedUnitId ? getCumulativeCategories(selectedUnitId) : [];

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleSelectPath(newPath) {
    setPath(newPath);
    setScreen('units');
  }

  function handleSelectUnit(unitId) {
    setSelectedUnitId(unitId);
    setScreen(path === 'category' ? 'categories' : 'unit-mode');
  }

  // Used by both CategorySelector (Path 1) and UnitModeSelector (Path 2).
  // `category` is either a real category object or a synthetic one built
  // from all items in the unit.
  function handleSelectMode(category, mode) {
    setSelectedCategory(category);
    setStudyMode(mode);
    setStudyKey((k) => k + 1);
    setScreen('study');
  }

  function handleFinish(score) {
    setSessionScore(score);
    setScreen('results');
  }

  function handleStudyAgain() {
    setStudyKey((k) => k + 1);
    setScreen('study');
  }

  // "Choose Another" returns to the right pre-study screen for the active path.
  function handleChooseAnother() {
    setScreen(path === 'category' ? 'categories' : 'unit-mode');
  }

  // Back button inside every study component.
  function handleBackFromStudy() {
    setScreen(path === 'category' ? 'categories' : 'unit-mode');
  }

  function handleBackToUnits() {
    setScreen('units');
  }

  function handleBackToHome() {
    setPath(null);
    setSelectedUnitId(null);
    setScreen('home');
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="app">

      {screen === 'home' && (
        <PathSelector onSelectPath={handleSelectPath} />
      )}

      {screen === 'units' && (
        <UnitSelector
          path={path}
          onSelectUnit={handleSelectUnit}
          onBack={handleBackToHome}
        />
      )}

      {screen === 'categories' && (
        <CategorySelector
          unitId={selectedUnitId}
          categories={categories}
          onSelectMode={handleSelectMode}
          onBack={handleBackToUnits}
        />
      )}

      {screen === 'unit-mode' && (
        <UnitModeSelector
          unitId={selectedUnitId}
          onSelectMode={handleSelectMode}
          onBack={handleBackToUnits}
        />
      )}

      {screen === 'study' && selectedCategory && (
        <>
          {studyMode === 'flashcard' && (
            <Flashcard
              key={studyKey}
              category={selectedCategory}
              onFinish={handleFinish}
              onBack={handleBackFromStudy}
            />
          )}
          {studyMode === 'quiz' && (
            <QuizMode
              key={studyKey}
              category={selectedCategory}
              onFinish={handleFinish}
              onBack={handleBackFromStudy}
            />
          )}
          {studyMode === 'definition-quiz' && (
            <DefinitionQuiz
              key={studyKey}
              category={selectedCategory}
              onFinish={handleFinish}
              onBack={handleBackFromStudy}
            />
          )}
          {studyMode === 'match' && (
            <MatchTheTerm
              key={studyKey}
              category={selectedCategory}
              onFinish={handleFinish}
              onBack={handleBackFromStudy}
            />
          )}
        </>
      )}

      {screen === 'results' && sessionScore && (
        <Results
          score={sessionScore}
          returnLabel={
            path === 'category' ? 'Choose Another Category' : 'Change Study Mode'
          }
          onStudyAgain={handleStudyAgain}
          onChooseAnother={handleChooseAnother}
        />
      )}

    </div>
  );
}
