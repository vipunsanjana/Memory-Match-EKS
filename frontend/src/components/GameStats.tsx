import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, Zap, Award } from 'lucide-react';

interface GameStatsProps {
  moves: number;
  matches: number;
  totalPairs: number;
  timeRemaining: number;
  difficulty: string;
}

export default function GameStats({ moves, matches, totalPairs, timeRemaining, difficulty }: GameStatsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining > 30) return 'text-green-400';
    if (timeRemaining > 10) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {/* Time Remaining */}
      <motion.div 
        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Clock size={20} className={getTimeColor()} />
          <span className="text-white text-sm font-medium">Time</span>
        </div>
        <div className={`text-2xl font-bold ${getTimeColor()}`}>
          {formatTime(timeRemaining)}
        </div>
      </motion.div>

      {/* Moves */}
      <motion.div 
        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap size={20} className="text-blue-400" />
          <span className="text-white text-sm font-medium">Moves</span>
        </div>
        <div className="text-2xl font-bold text-blue-400">
          {moves}
        </div>
      </motion.div>

      {/* Matches */}
      <motion.div 
        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Target size={20} className="text-green-400" />
          <span className="text-white text-sm font-medium">Matches</span>
        </div>
        <div className="text-2xl font-bold text-green-400">
          {matches}/{totalPairs}
        </div>
      </motion.div>

      {/* Difficulty */}
      <motion.div 
        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Award size={20} className="text-purple-400" />
          <span className="text-white text-sm font-medium">Level</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor()}`}>
            {difficulty.toUpperCase()}
          </span>
        </div>
      </motion.div>
    </div>
  );
}