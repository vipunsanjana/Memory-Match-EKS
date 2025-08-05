const express = require('express');
const GameController = require('../controllers/gameController');

const router = express.Router();
const gameController = new GameController();

// Game routes
router.post('/game/start', gameController.startGame);
router.post('/game/:gameId/move', gameController.makeMove);
router.get('/game/:gameId', gameController.getGameStatus);
router.get('/leaderboard', gameController.getLeaderboard);

module.exports = router;