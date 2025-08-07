import React from 'react';
import { motion } from 'framer-motion';
import { Play, Gamepad2 } from 'lucide-react';

interface MainMenuProps {
  onStartGame: (difficulty: string) => void;
  onShowLeaderboard: () => void;
}

export default function MainMenu({ onStartGame }: MainMenuProps) {
  const difficulties = [
    { id: 'easy', name: 'Easy', pairs: 6, time: '1 min', color: 'from-green-400 to-emerald-500' },
    { id: 'medium', name: 'Medium', pairs: 8, time: '1.5 min', color: 'from-yellow-400 to-orange-500' },
    { id: 'hard', name: 'Hard', pairs: 12, time: '2 min', color: 'from-red-400 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🧠
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Memory Game</h1>
          <p className="text-white/80 text-lg">Test your memory skills!</p>
          <div className="text-white/60 text-sm mt-2">
            By Vipun Sanjana - Former Software Engineer @WSO2<br></br>
            (Cloud Security Operations Center)
          </div>
        </motion.div>

        {/* Difficulty Selection */}
        <motion.div 
          className="space-y-4 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-white text-center mb-6">Choose Difficulty</h2>
          
          {difficulties.map((difficulty, index) => (
            <motion.button
              key={difficulty.id}
              onClick={() => onStartGame(difficulty.id)}
              className={`w-full p-4 rounded-xl bg-gradient-to-r ${difficulty.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Play size={20} />
                  <div className="text-left">
                    <div className="font-bold">{difficulty.name}</div>
                    <div className="text-sm opacity-90">{difficulty.pairs} pairs • {difficulty.time}</div>
                  </div>
                </div>
                <Gamepad2 size={24} />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Options */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >

        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8 text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p>❤️Ready for 2025 with code | all rights revived, Vipun Sanjana!🚀✨</p>
        </motion.div>
      </div>
    </div>
  );
}
