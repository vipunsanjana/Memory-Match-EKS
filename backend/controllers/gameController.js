const GameService = require('../services/GameService');

class GameController {
  constructor() {
    this.gameService = new GameService();

    // Cleanup old sessions every hour
    setInterval(() => {
      this.gameService.cleanupOldSessions();
    }, 60 * 60 * 1000);
  }

  startGame = (req, res) => {
    try {
      const { difficulty = 'medium' } = req.body;
      const gameData = this.gameService.startNewGame(difficulty);
      res.json(gameData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  async makeMove(gameId, cardId) {
    let game = this.gameSessions.get(gameId);

    // Retry if game not found yet (waits for backend init)
    let retries = 5; // try up to 5 times
    while (!game && retries > 0) {
      await new Promise(res => setTimeout(res, 50)); // wait 50ms
      game = this.gameSessions.get(gameId);
      retries--;
    }

    if (!game) {
      throw new Error(`Game ${gameId} not found after retries`);
    }

    return game.flipCard(cardId);
  }

  getGameStatus = (req, res) => {
    try {
      const { gameId } = req.params;
      const gameState = this.gameService.getGameStatus(gameId);
      res.json(gameState);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  getLeaderboard = (req, res) => {
    try {
      const leaderboard = this.gameService.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  };
}

module.exports = GameController;
