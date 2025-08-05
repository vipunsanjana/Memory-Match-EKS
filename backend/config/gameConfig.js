// Game configuration constants
const difficulties = {
  easy: { pairs: 6, timeLimit: 60 },
  medium: { pairs: 8, timeLimit: 90 },
  hard: { pairs: 12, timeLimit: 120 }
};

// Card emojis for the game
const cardEmojis = [
  '🎮', '🚀', '⭐', '🎯', '🏆', '💎', 
  '🔥', '⚡', '🌟', '🎪', '🎨', '🎭', 
  '🎪', '🎊', '🎉', '🏅'
];

module.exports = {
  difficulties,
  cardEmojis
};