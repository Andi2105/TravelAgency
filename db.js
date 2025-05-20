// sequelize.js
const { Sequelize } = require('sequelize');
const initModels = require('./models/init-models');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    port: process.env.DB_PORT || 1433,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      }
    },
    logging: false,
  }
);

// Initialize models
const models = initModels(sequelize);

// Test DB connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to SQL Server successfully');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1); // Optional: stop app if DB fails
  });

module.exports = {
  sequelize,
  models
};