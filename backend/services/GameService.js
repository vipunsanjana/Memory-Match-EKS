const GameSession = require('../models/GameSession');
const { difficulties, cardEmojis } = require('../config/gameConfig');

class GameService {
  constructor() {
    this.gameSessions = new Map();
  }

  generateCards(pairs) {
    const selectedEmojis = cardEmojis.slice(0, pairs);
    const cards = [...selectedEmojis, ...selectedEmojis]
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);
    
    return cards;
  }

  startNewGame(difficulty = 'medium') {
    if (!difficulties[difficulty]) {
      throw new Error('Invalid difficulty level');
    }

    const config = difficulties[difficulty];
    const cards = this.generateCards(config.pairs);
    const gameSession = new GameSession(difficulty, cards);

    this.gameSessions.set(gameSession.id, gameSession);

    return {
      gameId: gameSession.id,
      cards: gameSession.getPublicCards(),
      timeLimit: config.timeLimit,
      totalPairs: config.pairs
    };
  }

  makeMove(gameId, cardId) {
    const game = this.gameSessions.get(gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    if (game.isCompleted || game.isTimeUp()) {
      throw new Error('Game already completed');
    }

    // Flip the card
    game.flipCard(cardId);

    // Check for matches when 2 cards are flipped
    const { matchFound, gameCompleted } = game.checkForMatch();

    // Reset flipped cards after a delay if no match
    if (game.flippedCards.length === 2 && !matchFound) {
      setTimeout(() => {
        game.resetFlippedCards();
      }, 1000);
    } else if (matchFound) {
      game.flippedCards = [];
    }

    return {
      cards: game.getPublicCards(),
      moves: game.moves,
      matches: game.matches,
      matchFound,
      gameCompleted,
      score: gameCompleted ? game.score : 0,
      canFlip: game.flippedCards.length < 2
    };
  }

  getGameStatus(gameId) {
    const game = this.gameSessions.get(gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    return game.getGameState();
  }

  getLeaderboard(limit = 10) {
    const completedGames = Array.from(this.gameSessions.values())
      .filter(game => game.isCompleted)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(game => game.getLeaderboardEntry());

    return completedGames;
  }

  cleanupOldSessions() {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    for (const [gameId, session] of this.gameSessions.entries()) {
      if (now - session.startTime > maxAge) {
        this.gameSessions.delete(gameId);
      }
    }
  }
}

module.exports = GameService;