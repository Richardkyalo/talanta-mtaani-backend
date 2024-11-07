const userService = require('../services/userService');
const { createUserSchema } = require('../schema/userSchema');

exports.createUser = async (req, res) => {
  try {
    // Validate request data using Zod
    const validatedData = createUserSchema.parse(req.body);

    // Pass validated data to the service
    const user = await userService.createUser(validatedData);

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    if (err.name === 'ZodError') {
      // Send Zod validation errors
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
    res.status(500).json({ error: err.message });
  }
};
