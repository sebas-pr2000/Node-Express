// aqui tendremos toda la logica de los routes
class PeoplesService {
  constructor() {
    this.peoples = [
      {
        name: 'daniel',
        type: 'empleado',
      },
      {
        name: 'Sebastian',
        type: 'seguridad',
      },
      {
        name: 'felipe',
        type: 'empleado',
      },
    ];
  }

  create(name, type) {
    this.peoples.push({
      name,
      type,
    });
  }
  find() {
    return this.peoples;
  }
  findOne(id) {
    return this.products.find((product) => product.id === id);
  }
  update() {}
  delete() {}
}

module.exports = PeoplesService;
