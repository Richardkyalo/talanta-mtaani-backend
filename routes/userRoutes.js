const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const {  assignCoachRole } = require('../controllers/userController');
const { isAdmin } = require('../middlewares/authMiddleware');


// Route to create a new user
router.post('/create', createUser);

// Route for user login
router.post('/login', loginUser);


router.post('/assign-coach', isAdmin, assignCoachRole);

// Protected route example (authentication required)
router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Protected profile data', user: req.user });
});

module.exports = router;
