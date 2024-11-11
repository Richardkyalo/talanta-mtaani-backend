const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { authenticate, isCoach } = require('../middlewares/authMiddleware');
const { createTeam } = require('../controllers/teamController');

// Route to create a new team (only accessible by coaches)
router.post('/create', authenticate, isCoach, upload.single('profile_picture'), createTeam);

module.exports = router;
