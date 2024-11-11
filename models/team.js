module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    coach_id: {
      type: DataTypes.STRING(16), // Assuming coach_id is also a 16-character string
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'Teams',
    timestamps: true, // Enable automatic timestamps for created_at and updated_at
    createdAt: 'created_at', // Specify column name for createdAt
    updatedAt: 'updated_at', // Specify column name for updatedAt
  });

  Team.associate = (models) => {
    Team.belongsTo(models.User, { foreignKey: 'coach_id', as: 'coach' });
  };

  return Team;
};
