const faker = require('faker'); //traer libreria a archivo principal
const boom = require('@hapi/boom');

// aqui tendremos toda la logica de los routes
class PeoplesService {
  constructor() {
    this.peoples = [
      {
        name: 'daniel',
        type: 'employee',
        age: 23,
        area: 'store',
      },
      {
        name: 'Santiago',
        type: 'security guard',
        age: 25,
        area: 'bank',
      },
      {
        name: 'felipe',
        type: 'employee',
        age: 32,
        area: 'office',
      },
      {
        name: 'daniela',
        type: 'security guard',
        age: 20,
        area: 'office',
      },
      {
        name: 'anguie',
        type: 'employee',
        age: 22,
        area: 'bodega',
      },
      {
        name: 'jose',
        type: 'employee',
        age: 52,
        area: 'office',
      },
      {
        name: 'fabian',
        type: 'security guard',
        age: 72,
        area: 'warehouse',
      },
      {
        name: 'manuela',
        type: 'employee',
        age: 42,
        area: 'office',
      },
      {
        name: 'maria',
        type: 'employee',
        age: 28,
        area: 'warehouse',
      },
      {
        name: 'paola',
        type: 'employee',
        age: 41,
        area: 'bank',
      },
      {
        name: 'diego',
        type: 'security guard',
        age: 27,
        area: 'bank',
      },
      {
        name: 'ariel',
        type: 'employee',
        age: 26,
        area: 'warehouse',
      },
      {
        name: 'pedro',
        type: 'employee',
        age: 35,
        area: 'store',
      },
      {
        name: 'lidia',
        type: 'employee',
        age: 36,
        area: 'office',
      },
      {
        name: 'damian',
        type: 'security guard',
        age: 39,
        area: 'bank',
      },
      {
        name: 'sergio',
        type: 'employee',
        age: 29,
        area: 'office',
      },
      {
        name: 'rosa',
        type: 'employee',
        age: 26,
        area: 'warehouse',
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
