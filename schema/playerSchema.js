// validators/playerValidator.js
const { z } = require('zod');

const playerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
});

const validatePlayer = (req, res, next) => {
  try {
    playerSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid player data', errors: error.errors });
  }
};

module.exports = validatePlayer;
