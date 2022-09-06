const express = require('express'); // requerimos a express
const { route } = require('./productsRouter');
const PeoplesService = require('../services/peoplesServices');
const router = express.Router();

const people = new PeoplesService();

router.get('/', (req, res) => {
  const peoples = people.find();
  res.status(200).json(peoples);
});

router.post('/', (req, res) => {
  const { name, type } = req.body;
  people.create(name, type);
  res.status(201).send('people create correct');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'felipe',
    type: 'empleado',
  });
});

module.exports = router;
