require('dotenv').config();
const express = require('express');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to School Management API",
    status: "Active",
    endpoints: {
      addSchool: "POST /addSchool",
      listSchools: "GET /listSchools?latitude={lat}&longitude={lon}"
    }
  });
});

// Routes
app.use('/', schoolRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

const pool = require('./config/db');

// Test DB connection
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database!');
    connection.release();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

module.exports = app;
