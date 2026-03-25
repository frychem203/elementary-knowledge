import { useState } from 'react';
import UnitSelector     from './components/UnitSelector';
import CategorySelector from './components/CategorySelector';
import Flashcard        from './components/Flashcard';
import QuizMode         from './components/QuizMode';
import DefinitionQuiz   from './components/DefinitionQuiz';
import MatchTheTerm     from './components/MatchTheTerm';
import Results          from './components/Results';
import { getCumulativeCategories } from './data/index';
import './App.css';

export default function App() {
  const [screen, setScreen]                     = useState('home');
  const [selectedUnitId, setSelectedUnitId]     = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [studyMode, setStudyMode]               = useState(null);
  const [sessionScore, setSessionScore]         = useState(null);
  // Bump to force re-mount of study component on "Study Again"
  const [studyKey, setStudyKey]                 = useState(0);

  const categories = selectedUnitId ? getCumulativeCategories(selectedUnitId) : [];

  function handleSelectUnit(unitId) {
    setSelectedUnitId(unitId);
    setScreen('categories');
  }

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
    setScreen('categories');
  }

  function handleBackToCategories() {
    setScreen('categories');
  }

  function handleBackToHome() {
    setScreen('home');
    setSelectedUnitId(null);
  }

  return (
    <div className="app">
      {screen === 'home' && (
        <UnitSelector onSelectUnit={handleSelectUnit} />
      )}

      {screen === 'categories' && (
        <CategorySelector
          unitId={selectedUnitId}
          categories={categories}
          onSelectMode={handleSelectMode}
          onBack={handleBackToHome}
        />
      )}

      {screen === 'study' && selectedCategory && (
        <>
          {studyMode === 'flashcard' && (
            <Flashcard
              key={studyKey}
              category={selectedCategory}
              onFinish={handleFinish}
              onBack={handleBackToCategories}
            />
          )}
          {studyMode === 'quiz' && (
            <QuizMode
              key={studyKey}
              category={selectedCategory}
              onFinish={handleFinish}
              onBack={handleBackToCategories}
            />
          )}
          {studyMode === 'definition-quiz' && (
            <DefinitionQuiz
              key={studyKey}
              category={selectedCategory}
              onFinish={handleFinish}
              onBack={handleBackToCategories}
            />
          )}
          {studyMode === 'match' && (
            <MatchTheTerm
              key={studyKey}
              category={selectedCategory}
              onFinish={handleFinish}
              onBack={handleBackToCategories}
            />
          )}
        </>
      )}

      {screen === 'results' && sessionScore && (
        <Results
          score={sessionScore}
          onStudyAgain={handleStudyAgain}
          onChooseAnother={handleChooseAnother}
        />
      )}
    </div>
  );
}
