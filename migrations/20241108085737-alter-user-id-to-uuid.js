module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'id', {
      type: Sequelize.STRING(16),  // Change column to string with length 16
      allowNull: false,
      primaryKey: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'id', {
      type: Sequelize.INTEGER, // Revert to integer type (or other types as needed)
      allowNull: false,
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Revert the changes made in the up migration.
   *
   * This function should contain the logic to undo the alterations performed
   * during the up migration, ensuring the database schema is returned to its
   * previous state.
   */
/******  3cb2d26b-6f63-4f19-b410-983043f7bf46  *******/      autoIncrement: true,
    });
  }
};
