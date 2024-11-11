module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      team_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    }, {
      tableName: 'Players',
      timestamps: true,
    });
  
    Player.associate = (models) => {
      Player.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team' });
    };
  
    return Player;
  };
  