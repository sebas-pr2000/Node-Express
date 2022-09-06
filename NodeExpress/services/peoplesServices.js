const faker = require('faker'); //traer libreria a archivo principal
const boom = require('@hapi/boom');

// aqui tendremos toda la logica de los routes
class PeoplesService {
  constructor() {
    this.peoples = [
      {
        name: 'daniel',
        type: 'empleado',
        age: 23,
        area: 'almacen',
      },
      {
        name: 'Santiago',
        type: 'seguridad',
        age: 25,
        area: 'banco',
      },
      {
        name: 'felipe',
        type: 'empleado',
        age: 32,
        area: 'oficina',
      },
      {
        name: 'daniela',
        type: 'empleada',
        age: 20,
        area: 'oficina',
      },
      {
        name: 'anguie',
        type: 'empleado',
        age: 22,
        area: 'bodega',
      },
      {
        name: 'jose',
        type: 'empleado',
        age: 52,
        area: 'oficina',
      },
      {
        name: 'fabian',
        type: 'empleado',
        age: 72,
        area: 'bodega',
      },
      {
        name: 'manuela',
        type: 'empleado',
        age: 42,
        area: 'office',
      },
      {
        name: 'maria',
        type: 'empleado',
        age: 28,
        area: 'bodega',
      },
      {
        name: 'paola',
        type: 'empleado',
        age: 41,
        area: 'banco',
      },
      {
        name: 'diego',
        type: 'empleado',
        age: 27,
        area: 'banco',
      },
      {
        name: 'ariel',
        type: 'empleado',
        age: 26,
        area: 'bodega',
      },
      {
        name: 'pedro',
        type: 'empleado',
        age: 35,
        area: 'almacen',
      },
      {
        name: 'lidia',
        type: 'empleado',
        age: 36,
        area: 'office',
      },
      {
        name: 'damian',
        type: 'empleado',
        age: 39,
        area: 'banco',
      },
      {
        name: 'sergio',
        type: 'empleado',
        age: 29,
        area: 'office',
      },
      {
        name: 'rosa',
        type: 'empleado',
        age: 26,
        area: 'bodega',
      },
    ];
    this.generateIds();
  }
  generateIds() {
    for (let index = 0; index < this.peoples.length; index++) {
      const people = this.peoples[index];
      this.peoples[index] = {
        id: faker.datatype.uuid(),
        ...people,
      };
    }
  }

  create(data) {
    let newPeople = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.peoples.push(newPeople);
    return newPeople;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.peoples);
      }, 3000);
    });
  }

  async findOne(id) {
    const people = this.peoples.find((people) => people.id === id);
    if (!people) {
      throw boom.notFound('people not Found');
    }
    return people;
  }

  async update(id, changes) {
    const index = this.peoples.findIndex((people) => people.id === id);
    if (index === -1) {
      throw boom.notFound('people not Found');
    }
    const people = this.peoples[index];
    this.peoples[index] = {
      ...people,
      ...changes,
    };
    return this.peoples[index];
  }
  async delete(id) {
    const index = this.peoples.findIndex((people) => people.id === id);
    if (index === -1) {
      //   throw new Error('Product not found');
      throw boom.notFound('people not Found');
    }
    this.peoples.splice(index, 1);
    return 'people delete';
  }
}

module.exports = PeoplesService;
