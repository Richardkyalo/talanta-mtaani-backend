require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const JWT_SECRET  = process.env.JWT_SECRET; // Import secret from config

/**
 * Create a new user and generate a JWT token
 * @param {Object} userData - Data for creating the user (username, email, password, role)
 * @returns {Object} - The newly created user and JWT token
 */
exports.createUser = async (userData) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create the user
    const user = await User.create({
      username: userData.username,
      email: userData.email,
      password_hash: hashedPassword,
      role: userData.role,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the user and the token
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      token: token,  // The token to include in the response
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error('Error creating user');
  }
};

/**
 * Authenticate a user by email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} - User data and JWT token
 */
exports.authenticateUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    // Check if the password is correct
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) throw new Error('Invalid password');

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      token: token,
    };
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw new Error('Authentication failed');
  }
};
exports.assignRole = async (userId, newRole) => {
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    // Assign the new role
    user.role = newRole;
    await user.save();

    return user;
  } catch (error) {
    throw new Error(error.message || 'Error assigning role');
  }
};