const { Team } = require('../models');

const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    const profile_picture = req.file ? req.file.path : null; // Handle the profile picture if it's uploaded

    const newTeam = await Team.create({
      name,
      description,
      profile_picture,
      coach_id: req.user.id, // Assuming coach ID is set in the request by the authentication middleware
    });

    res.status(201).json({ team: newTeam });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating team', error: err.message });
  }
};

module.exports = { createTeam };
