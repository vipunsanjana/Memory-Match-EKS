import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GameCard from './GameCard';
import GameStats from './GameStats';
import Confetti from 'react-confetti';
import { Trophy, RotateCcw, Home } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameBoardProps {
  difficulty: string;
  onBackToMenu: () => void;
}

export default function GameBoard({ difficulty, onBackToMenu }: GameBoardProps) {
  const [gameId, setGameId] = useState<string>('');
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [canFlip, setCanFlip] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Start new game
  const startNewGame = async () => {
    try {
      setErrorMessage(null);
      const response = await fetch('/api/game/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to start game');
        return;
      }

      if (!data.cards) {
        setErrorMessage('Invalid response from server');
        return;
      }

      setGameId(data.gameId);
      setCards(data.cards);
      setTimeRemaining(data.timeLimit);
      setTotalPairs(data.totalPairs);
      setMoves(0);
      setMatches(0);
      setScore(0);
      setIsGameCompleted(false);
      setShowConfetti(false);
      setCanFlip(true);
    } catch (error) {
      setErrorMessage('Failed to start game: ' + (error as Error).message);
    }
  };

  // Handle card click
  const handleCardClick = async (cardId: number) => {
    if (!canFlip || isGameCompleted) return;

    try {
      setErrorMessage(null);
      const response = await fetch(`/api/game/${gameId}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to make move');
        return;
      }

      if (!data.cards) {
        setErrorMessage('Invalid response from server');
        return;
      }

      setCards(data.cards);
      setMoves(data.moves);
      setMatches(data.matches);
      setCanFlip(data.canFlip);

      if (data.gameCompleted) {
        setIsGameCompleted(true);
        setScore(data.score);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }

      if (!data.matchFound && !data.canFlip) {
        setTimeout(() => {
          setCanFlip(true);
          fetchGameStatus();
        }, 1500);
      }
    } catch (error) {
      setErrorMessage('Failed to make move: ' + (error as Error).message);
    }
  };

  // Fetch current game status
  const fetchGameStatus = async () => {
    if (!gameId) return;

    try {
      setErrorMessage(null);
      const response = await fetch(`/api/game/${gameId}`);
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to fetch game status');
        return;
      }

      if (!data.cards) {
        setErrorMessage('Invalid response from server');
        return;
      }

      setCards(data.cards);
      setMoves(data.moves);
      setMatches(data.matches);
      setTimeRemaining(data.timeRemaining);
      setTotalPairs(data.totalPairs);

      if (data.isCompleted && !isGameCompleted) {
        setIsGameCompleted(true);
        setScore(data.score);
      }
    } catch (error) {
      setErrorMessage('Failed to fetch game status: ' + (error as Error).message);
    }
  };

  // Timer effect
  useEffect(() => {
    if (gameId && timeRemaining > 0 && !isGameCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsGameCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameId, timeRemaining, isGameCompleted]);

  // Start game on difficulty change
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const gridCols = totalPairs <= 6 ? 'grid-cols-3' : totalPairs <= 8 ? 'grid-cols-4' : 'grid-cols-4 sm:grid-cols-6';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <motion.button
            onClick={onBackToMenu}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home size={20} />
            Menu
          </motion.button>

          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
            Memory Game
          </h1>

          <motion.button
            onClick={startNewGame}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={20} />
            New Game
          </motion.button>
        </div>

        {/* Game Stats */}
        <GameStats 
          moves={moves}
          matches={matches}
          totalPairs={totalPairs}
          timeRemaining={timeRemaining}
          difficulty={difficulty}
        />

        {/* Game Board */}
        <motion.div 
          className={`grid ${gridCols} gap-3 sm:gap-4 justify-center max-w-2xl mx-auto mb-8`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {cards.map((card) => (
            <GameCard
              key={card.id}
              id={card.id}
              emoji={card.emoji}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(card.id)}
              disabled={!canFlip || isGameCompleted}
            />
          ))}
        </motion.div>

        {/* Game Completed Modal */}
        {isGameCompleted && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-6xl mb-4">
                {matches === totalPairs ? '🎉' : '⏰'}
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {matches === totalPairs ? 'Congratulations!' : 'Time\'s Up!'}
              </h2>
              
              {matches === totalPairs && (
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="text-yellow-500" size={24} />
                    <span className="text-3xl font-bold text-yellow-500">{score}</span>
                  </div>
                  <p className="text-gray-600">Final Score</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Completed in {moves} moves
                  </p>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                <motion.button
                  onClick={startNewGame}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Again
                </motion.button>
                
                <motion.button
                  onClick={onBackToMenu}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Main Menu
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
