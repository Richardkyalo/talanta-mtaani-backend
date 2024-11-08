module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Removing redundant timestamp columns
    await queryInterface.removeColumn('Users', 'createdAt');
    await queryInterface.removeColumn('Users', 'updatedAt');
    await queryInterface.removeColumn('Users', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting the removal of columns (if necessary)
    await queryInterface.addColumn('Users', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('Users', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('Users', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
  }
};
