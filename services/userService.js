require('dotenv').config();  // Load environment variables

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Define a secret key for signing the JWT from environment variable
const JWT_SECRET = process.env.JWT_SECRET;  // JWT_SECRET now comes from the .env file

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
