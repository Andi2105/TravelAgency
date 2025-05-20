const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { Payments } = models

router.get('/', async (req, res) => {
  const payments = await Payments.findAll();
  res.json(payments);
});

router.post('/', async (req, res) => {
  const payment = await Payments.create(req.body);
  res.status(201).json(payment);
});

router.get('/:id', async (req, res) => {
  const payment = await Payments.findByPk(req.params.id);
  res.json(payment);
});

module.exports = router