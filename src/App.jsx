import { useState } from 'react';
import PathSelector     from './components/PathSelector';
import UnitSelector     from './components/UnitSelector';
import CategorySelector from './components/CategorySelector';
import UnitModeSelector from './components/UnitModeSelector';
import Flashcard        from './components/Flashcard';
import QuizMode         from './components/QuizMode';
import DefinitionQuiz   from './components/DefinitionQuiz';
import MatchTheTerm     from './components/MatchTheTerm';
import Results          from './components/Results';
import './App.css';

export default function App() {
  // ── Navigation ───────────────────────────────────────────────────────────
  const [screen, setScreen] = useState('home');
  // 'home' | 'units' | 'categories' | 'unit-mode' | 'study' | 'results'

  // ── Path ─────────────────────────────────────────────────────────────────
  const [path, setPath] = useState(null); // 'category' | 'unit'

  // ── Study session ────────────────────────────────────────────────────────
  const [selectedUnitId, setSelectedUnitId]     = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [studyMode, setStudyMode]               = useState(null);
  const [sessionScore, setSessionScore]         = useState(null);
  const [studyKey, setStudyKey]                 = useState(0);

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleSelectPath(newPath) {
    setPath(newPath);
    // Category path: skip unit selection — jump straight to all-categories screen.
    // Unit path: student must pick a unit first.
    setScreen(newPath === 'category' ? 'categories' : 'units');
  }

  // Only used by Path 2 (Study by Unit)
  function handleSelectUnit(unitId) {
    setSelectedUnitId(unitId);
    setScreen('unit-mode');
  }

  // Shared by CategorySelector (Path 1) and UnitModeSelector (Path 2)
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

  function handleChooseAnother() {
    setScreen(path === 'category' ? 'categories' : 'unit-mode');
  }

  function handleBackFromStudy() {
    setScreen(path === 'category' ? 'categories' : 'unit-mode');
  }

  // Path 1: back from the all-categories screen → home
  function handleBackFromCategories() {
    setPath(null);
    setScreen('home');
  }

  // Path 2: back from unit-mode → unit selector
  function handleBackToUnits() {
    setScreen('units');
  }

  // Path 2: back from unit selector → home
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

      {/* Path 2 only: pick a unit */}
      {screen === 'units' && (
        <UnitSelector
          onSelectUnit={handleSelectUnit}
          onBack={handleBackToHome}
        />
      )}

      {/* Path 1: all categories, no unit filter */}
      {screen === 'categories' && (
        <CategorySelector
          onSelectMode={handleSelectMode}
          onBack={handleBackFromCategories}
        />
      )}

      {/* Path 2: pick a study mode for the whole unit */}
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
