const GameService = require('../services/GameService');

class GameController {
  constructor() {
    this.gameService = new GameService();

    // Cleanup old sessions every hour
    setInterval(() => {
      this.gameService.cleanupOldSessions();
    }, 60 * 60 * 1000);
  }

  startGame = async (req, res) => {
    try {
      const { difficulty = 'medium' } = req.body;
      const gameData = await this.gameService.startNewGame(difficulty); // await if async
      res.json(gameData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  makeMove = async (req, res) => {
    try {
      const { gameId } = req.params;
      const { cardId } = req.body;

      const result = await this.gameService.makeMove(gameId, cardId); // await if async
      res.json(result);
    } catch (error) {
      if (error.message === 'Game not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  };

  getGameStatus = async (req, res) => {
    try {
      const { gameId } = req.params;
      const gameState = await this.gameService.getGameStatus(gameId);
      res.json(gameState);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  getLeaderboard = async (req, res) => {
    try {
      const leaderboard = await this.gameService.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  };
}

module.exports = GameController;
