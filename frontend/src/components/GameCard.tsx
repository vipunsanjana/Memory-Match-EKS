import React from 'react';
import { motion } from 'framer-motion';

interface GameCardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function GameCard({ id, emoji, isFlipped, isMatched, onClick, disabled }: GameCardProps) {
  return (
    <motion.div
      className="relative h-20 w-20 sm:h-24 sm:w-24 cursor-pointer"
      whileHover={!disabled && !isFlipped ? { scale: 1.05 } : {}}
      whileTap={!disabled && !isFlipped ? { scale: 0.95 } : {}}
      onClick={!disabled && !isFlipped && !isMatched ? onClick : undefined}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className={`w-full h-full rounded-xl shadow-lg border-2 transition-all duration-300 ${
            isMatched 
              ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300' 
              : 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 hover:shadow-xl hover:border-purple-400'
          }`}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className={`w-full h-full rounded-xl shadow-lg border-2 transition-all duration-300 ${
            isMatched 
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300' 
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
          }`}>
            <div className="w-full h-full flex items-center justify-center">
              <motion.span 
                className="text-2xl sm:text-3xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                {emoji}
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
