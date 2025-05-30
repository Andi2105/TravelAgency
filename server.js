const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
const packageRouter = require('./package-route.js') // rename
const bookingsRouter = require('./bookings-route.js')

app.use('/packages', packageRouter);   
app.use('/bookings', bookingsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));