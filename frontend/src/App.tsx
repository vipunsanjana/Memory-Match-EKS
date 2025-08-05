import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';

type GameState = 'menu' | 'playing' | 'leaderboard';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState('medium');

  const handleStartGame = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  const handleShowLeaderboard = () => {
    setGameState('leaderboard');
  };

  switch (gameState) {
    case 'playing':
      return <GameBoard difficulty={difficulty} onBackToMenu={handleBackToMenu} />;
    
    case 'leaderboard':
      return <Leaderboard onBack={handleBackToMenu} />;
    
    default:
      return (
        <MainMenu 
          onStartGame={handleStartGame}
          onShowLeaderboard={handleShowLeaderboard}
        />
      );
  }
}

export default App;