const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { Destinations } = models

router.get('/', async (req, res) => {
  const data = await Destinations.findAll();
  res.json(data);
});

router.post('/', async (req, res) => {
  const created = await Destinations.create(req.body);
  res.status(201).json(created);
});

router.get('/:id', async (req, res) => {
  const item = await Destinations.findByPk(req.params.id);
  res.json(item);
});

router.put('/:id', async (req, res) => {
  await Destinations.update(req.body, { where: { id: req.params.id } });
  res.send('Destination updated');
});

router.delete('/:id', async (req, res) => {
  await Destinations.destroy({ where: { id: req.params.id } });
  res.send('Destination deleted');
});

module.exports = router;