const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
