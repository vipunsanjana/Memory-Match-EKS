const { v4: uuidv4 } = require('uuid');

class GameSession {
  constructor(difficulty, cards) {
    this.id = uuidv4();
    this.difficulty = difficulty;
    this.cards = cards;
    this.flippedCards = [];
    this.matches = 0;
    this.moves = 0;
    this.startTime = Date.now();
    this.timeLimit = this.getTimeLimit(difficulty);
    this.isCompleted = false;
    this.score = 0;
  }

  getTimeLimit(difficulty) {
    const { difficulties } = require('../config/gameConfig');
    return difficulties[difficulty]?.timeLimit || 90;
  }

  flipCard(cardId) {
    const card = this.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) {
      throw new Error('Invalid move');
    }

    card.isFlipped = true;
    this.flippedCards.push(card);
    return card;
  }

  checkForMatch() {
    if (this.flippedCards.length !== 2) {
      return { matchFound: false, gameCompleted: false };
    }

    this.moves++;
    const [first, second] = this.flippedCards;
    let matchFound = false;
    let gameCompleted = false;

    if (first.emoji === second.emoji) {
      // Match found
      first.isMatched = true;
      second.isMatched = true;
      this.matches++;
      matchFound = true;

      // Check if game is completed
      if (this.matches === this.cards.length / 2) {
        this.isCompleted = true;
        gameCompleted = true;
        this.calculateScore();
      }
    }

    return { matchFound, gameCompleted };
  }

  resetFlippedCards() {
    this.flippedCards.forEach(card => {
      if (!card.isMatched) {
        card.isFlipped = false;
      }
    });
    this.flippedCards = [];
  }

  calculateScore() {
    const timeElapsed = (Date.now() - this.startTime) / 1000;
    const timeBonus = Math.max(0, this.timeLimit - timeElapsed) * 10;
    const movesPenalty = this.moves * 2;
    this.score = Math.max(0, Math.round(1000 + timeBonus - movesPenalty));
  }

  getTimeRemaining() {
    const timeElapsed = (Date.now() - this.startTime) / 1000;
    return Math.max(0, this.timeLimit - timeElapsed);
  }

  isTimeUp() {
    return this.getTimeRemaining() <= 0;
  }

  getPublicCards() {
    return this.cards.map(card => ({
      id: card.id,
      emoji: card.emoji,
      isFlipped: card.isFlipped,
      isMatched: card.isMatched
    }));
  }

  getGameState() {
    return {
      cards: this.getPublicCards(),
      moves: this.moves,
      matches: this.matches,
      timeRemaining: Math.round(this.getTimeRemaining()),
      isCompleted: this.isCompleted || this.isTimeUp(),
      score: this.score,
      totalPairs: this.cards.length / 2
    };
  }

  getLeaderboardEntry() {
    return {
      score: this.score,
      moves: this.moves,
      difficulty: this.difficulty,
      completedAt: new Date(this.startTime).toISOString()
    };
  }
}

module.exports = GameSession;