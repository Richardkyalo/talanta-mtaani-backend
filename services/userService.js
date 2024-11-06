const bcrypt = require('bcrypt');
const { User } = require('../models');

/**
 * Create a new user
 * @param {Object} userData - Data for creating the user (username, email, password, role)
 * @returns {Object} - The newly created user
 */
exports.createUser = async (userData) => {
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({
    username: userData.username,
    email: userData.email,
    password_hash: hashedPassword,
    role: userData.role,
  });

  return user;
};
