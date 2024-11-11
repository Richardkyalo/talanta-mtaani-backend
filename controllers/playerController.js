// controllers/playerController.js
const playerService = require('../services/playerService');

const createPlayer = async (req, res) => {
  try {
    const coachId = req.user.id; // ID of the logged-in coach
    const { teamId } = req.params;
    const { name, position } = req.body;

    const player = await playerService.createPlayer(coachId, teamId, { name, position });

    res.status(201).json({ message: 'Player created successfully', player });
  } catch (error) {
    res.status(400).json({ message: 'Error creating player', error: error.message });
  }
};

module.exports = { createPlayer };
