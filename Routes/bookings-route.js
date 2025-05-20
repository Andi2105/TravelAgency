const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { Booking } = models

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    booking ? res.json(booking) : res.status(404).send('Booking not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Booking.update(req.body, { where: { id: req.params.id } });
    res.send('Booking updated');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Booking.destroy({ where: { id: req.params.id } });
    res.send('Booking deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;