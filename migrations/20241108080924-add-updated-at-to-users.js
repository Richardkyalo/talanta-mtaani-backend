module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding the `updated_at` column
    await queryInterface.addColumn('Users', 'updated_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Set the default value to the current time
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting the change if needed
    await queryInterface.removeColumn('Users', 'updated_at');
  }
};
