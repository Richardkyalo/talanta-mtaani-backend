const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING(16),  // Using a string of length 16
      primaryKey: true,            // Make this the primary key
      allowNull: false,
      defaultValue: () => uuidv4().slice(0, 16), // Generate a UUID and slice it to 16 characters
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    tableName: 'Users',
    timestamps: true, // Enable automatic timestamps for created_at and updated_at
    createdAt: 'created_at', // Specify column name for createdAt
    updatedAt: 'updated_at', // Specify column name for updatedAt
  });

  return User;
};
