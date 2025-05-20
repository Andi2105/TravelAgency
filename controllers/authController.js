const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router()
require('dotenv').config();

const { Users } = require('../models/Users'); 
const app = express();

app.use(express.json());


app.post('/register', async (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password)
    return res.status(400).json({ message: 'Username and Password are required' });

  try {
    const existing = await Users.findOne({ where: { Username } });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = await Users.create({ Username, Password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.UserID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/login', async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await Users.findOne({ where: { Username } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.UserID, username: user.Username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router

