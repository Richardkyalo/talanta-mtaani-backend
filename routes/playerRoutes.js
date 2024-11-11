// routes/playerRoutes.js
const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const playerController = require('../controllers/playerController');
const authorizeCoach = require('../middlewares/authorizeCoach');
const validatePlayer = require('../schema/playerSchema')

const router = express.Router();

router.post('/player/:teamId/players', authenticate, authorizeCoach, validatePlayer, playerController.createPlayer);

module.exports = router;
