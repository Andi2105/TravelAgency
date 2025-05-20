const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require('../db')

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('../Routes/users_route'));
app.use('/api/bookings', require('../Routes/bookings-route'));
app.use('/api/payments', require('../Routes/payments-route'));
app.use('/api/packages', require('../Routes/package-route'));
app.use('/api/reviews', require('../Routes/reviews-route'));
app.use('/api/destinations', require('../Routes/destinations-route'));
app.use('/api/categories', require('../Routes/categories-route'));
// Server
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
