module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Default value for created_at
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Default value for updated_at
    },
  }, {
    tableName: 'Users',
    timestamps: true, // Enable Sequelize's automatic timestamp columns (createdAt and updatedAt)
    underscored: true, // Use snake_case for column names (e.g., `created_at`, `updated_at`)
  });

  return User;
};
