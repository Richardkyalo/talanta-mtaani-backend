const { z } = require('zod');

const createUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['admin', 'player', 'coach', 'referee', 'fan'], {
    invalid_type_error: 'Role must be one of: admin, player, coach, referee, or fan',
  }),
});

module.exports = { createUserSchema };
