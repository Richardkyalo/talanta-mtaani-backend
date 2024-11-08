const userService = require('../services/userService');
const { assignRole } = require('../services/userService');
/**
 * Handle user creation request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await userService.createUser(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Handle user login request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.authenticateUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Handle assigning a user to the coach role
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.assignCoachRole = async (req, res) => {
  const { userId } = req.body; // Get user ID to assign the role to

  try {
    // Call service to assign the 'coach' role
    const updatedUser = await assignRole(userId, 'coach');
    res.status(200).json({ message: 'User assigned to coach role successfully', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
