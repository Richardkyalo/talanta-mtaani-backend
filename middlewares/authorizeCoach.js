// middlewares/authorizeCoach.js
const authorizeCoach = (req, res, next) => {
    if (req.user.role !== 'coach') {
      return res.status(403).json({ message: 'Access denied. Only coaches can register players.' });
    }
    next();
  };
  
  module.exports = authorizeCoach;
  