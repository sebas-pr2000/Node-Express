const express = require('express'); // requerimos a express
const { route } = require('./productsRouter');
const PeoplesService = require('../services/peoplesServices');
const router = express.Router();

const people = new PeoplesService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPeopleSchema,
  updatePeopleSchema,
  getPeopleSchema,
} = require('../schemas/people.schema'); // traemos schemas

router.get('/', async (req, res, next) => {
  try {
    const peoples = await people.find();
    res.status(200).json(peoples);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getPeopleSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params; // parametros
    try {
      const peopleId = await people.findOne(id);
      res.status(200).json(peopleId);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createPeopleSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newPeople = await people.create(body);
      res.status(201).send(newPeople);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getPeopleSchema, 'params'),
  validatorHandler(updatePeopleSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const peopleUpdate = await people.update(id, body);
      res.status(201).json(peopleUpdate);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getPeopleSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletePeople = await people.delete(id);
      res.status(202).json(deletePeople);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
