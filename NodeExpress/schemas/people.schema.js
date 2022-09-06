const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const type = Joi.string().min(3);
const age = Joi.number().integer();
const area = Joi.string().min(3);

const createPeopleSchema = Joi.object({
  name: name.required(),
  type: type.required(),
  age: age.required(),
  area: area.required(),
});

const updatePeopleSchema = Joi.object({
  name: name,
  type: type,
  age: age,
  area: area,
});

const getPeopleSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPeopleSchema,
  updatePeopleSchema,
  getPeopleSchema,
};
