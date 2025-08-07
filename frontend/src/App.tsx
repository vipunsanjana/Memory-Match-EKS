import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';

type GameState = 'menu' | 'playing' | 'leaderboard';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState('medium');

  // Log whenever gameState changes
  useEffect(() => {
    console.log(`Game state changed to: ${gameState}`);
  }, [gameState]);

  // Log whenever difficulty changes
  useEffect(() => {
    console.log(`Difficulty set to: ${difficulty}`);
  }, [difficulty]);

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
    console.log('Showing leaderboard');
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
