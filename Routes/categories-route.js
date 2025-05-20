const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { Category } = models

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    category ? res.json(category) : res.status(404).send('Category not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Category.update(req.body, { where: { id: req.params.id } });
    res.send('Category updated');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.send('Category deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;