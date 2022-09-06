// aqui tendremos toda la logica de los routes:

const faker = require('faker'); //traer libreria a archivo principal
const boom = require('@hapi/boom'); // traemos la libreri a de "boom" que funciona para la captura de errores

class ProductsService {
  constructor() {
    this.products = [];
    this.generate(); // cuando creemos una nueva clase automaticamente se crearan 100 productos
  }
  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      // todos estos datos son de la libreria de faker
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    let newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    // promesa
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  async findOne(id) {
    // const name = this.getTotal(); // const diseñanda para probar middlewares
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('product not Found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is Block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      //   throw new Error('Product not found'); // sin libreria boom
      throw boom.notFound('product not Found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      //   throw new Error('Product not found');
      throw boom.notFound('product not Found');
    }
    this.products.splice(index, 1);
    return 'product delete';
  }
}
module.exports = ProductsService;
