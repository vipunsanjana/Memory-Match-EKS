import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';

type GameState = 'menu' | 'playing' | 'leaderboard';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState('medium');

  const handleStartGame = (selectedDifficulty: string) => {
    console.log(`Starting game with difficulty: ${selectedDifficulty}`);
    setDifficulty(selectedDifficulty);
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    console.log('Returning to main menu');
    setGameState('menu');
  };

  const handleShowLeaderboard = () => {
    console.log('Navigating to leaderboard');
    setGameState('leaderboard');
  };

  console.log(`Current game state: ${gameState}`);
  console.log(`Current difficulty: ${difficulty}`);

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
