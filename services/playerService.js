// services/playerService.js
const { Player, Team } = require('../models');

const createPlayer = async (coachId, teamId, playerData) => {
  // Verify that the team belongs to the coach
  const team = await Team.findOne({ where: { id: teamId, coach_id: coachId } });
  if (!team) {
    throw new Error('You can only register players for your own team.');
  }

  // Create the player
  const player = await Player.create({
    ...playerData,
    team_id: teamId,
  });

  return player;
};

module.exports = { createPlayer };
