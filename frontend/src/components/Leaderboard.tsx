import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, ArrowLeft, Crown } from 'lucide-react';

interface LeaderboardEntry {
  score: number;
  moves: number;
  difficulty: string;
  completedAt: string;
}

interface LeaderboardProps {
  onBack: () => void;
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="text-yellow-500" size={24} />;
      case 1: return <Medal className="text-gray-400" size={24} />;
      case 2: return <Award className="text-amber-600" size={24} />;
      default: return <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">{index + 1}</div>;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            Back
          </motion.button>

          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              <Trophy className="text-yellow-500" size={32} />
              Leaderboard
            </h1>
          </div>
        </div>

        {/* Leaderboard Content */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading scores...</p>
            </div>
          ) : scores.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🎮</div>
              <p className="text-white text-lg mb-2">No scores yet!</p>
              <p className="text-white/70">Complete a game to see your score here.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {scores.map((score, index) => (
                <motion.div
                  key={index}
                  className="p-4 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getRankIcon(index)}
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold text-white">
                            {score.score.toLocaleString()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(score.difficulty)}`}>
                            {score.difficulty.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-white/70 text-sm">
                          {score.moves} moves • {formatDate(score.completedAt)}
                        </div>
                      </div>
                    </div>

                    {index < 3 && (
                      <motion.div
                        className="text-2xl"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: index * 0.5
                        }}
                      >
                        {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats Summary */}
        {scores.length > 0 && (
          <motion.div
            className="grid grid-cols-3 gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {Math.max(...scores.map(s => s.score)).toLocaleString()}
              </div>
              <div className="text-white/70 text-sm">Best Score</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {scores.length}
              </div>
              <div className="text-white/70 text-sm">Games Played</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-green-400">
                {Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length).toLocaleString()}
              </div>
              <div className="text-white/70 text-sm">Avg Score</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
