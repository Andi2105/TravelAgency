const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { Users } = models

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    await Users.update(req.body, { where: { id: req.params.id } });
    res.send('User updated');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    await Users.destroy({ where: { id: req.params.id } });
    res.send('User deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;