const express = require('express');
const router = express.Router();
const { models } = require('../db')
const { Package } = models

router.post('/', async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id);
    pkg ? res.json(pkg) : res.status(404).send('Package not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router