const { Team } = require('../models');

/**
 * Create a new team
 * @param {Object} teamData - Data for creating the team (name, coach_id, profile_picture)
 * @returns {Object} - The newly created team
 */
exports.createTeam = async (teamData) => {
  try {
    const team = await Team.create(teamData);
    return team;
  } catch (error) {
    throw new Error('Error creating team');
  }
};
