const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { Review } = models

router.post('/', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    review ? res.json(review) : res.status(404).send('Review not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Review.update(req.body, { where: { id: req.params.id } });
    res.send('Review updated');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Review.destroy({ where: { id: req.params.id } });
    res.send('Review deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;