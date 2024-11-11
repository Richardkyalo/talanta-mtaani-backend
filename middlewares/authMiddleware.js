require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const  JWT_SECRET  = process.env.JWT_SECRET; // Secret key for JWT

/**
 * Middleware to authenticate and verify JWT token
 */
exports.authenticate = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });

    req.user = decoded;  // Attach decoded user to the request object
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
    try {
      const token = req.headers['x-access-token'] || req.body.token || req.query.token;
  
      if (!token) {
        return res.status(403).json({ message: 'Token is required' });
      }
  
      const decoded = jwt.verify(token, JWT_SECRET);
  
      // Find the user by id from the decoded token
      const user = await User.findOne({ where: { id: decoded.id } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is an admin
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
      }
  
      req.user = user; // Attach user data to request
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error verifying token' });
    }
  };
  exports.isCoach = async (req, res, next) => {
    try {
      // Check if user has the role "coach"
      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.role !== 'coach') {
        return res.status(403).json({ message: 'Access denied: Coaches only' });
      }
  
      req.user = user;  // Attach user data to request
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error verifying user role' });
    }
  };