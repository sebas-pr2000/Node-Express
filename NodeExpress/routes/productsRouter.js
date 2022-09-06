const express = require('express');

// TRAEMOS LOS MIDDLEWARES

const ProductsService = require('../services/productsServices');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} = require('../schemas/product.schema'); // traemos schemas

const router = express.Router();

const service = new ProductsService(); // creamos una nueva clase que contenga todos los metodos

//                                     SEPARANDO LA LOGICA

router.get('/', async (req, res, error) => {
  try {
    const products = await service.find();
    res.status(200).json(products); // devolvemos el array de productos
  } catch (error) {
    next(error);
  }
});

//                        ANTES DE SEPARAR LA LOGICA

// router.get("/", (req, res)=>{ // ya que sera como una API mandaremos JSON
//     const products = []; // aqui guardaremos los productos de la libreria de faker
//     const {size} = req.query;
//     const limit = size || 10;// si el size no existe por defecto sera el 10 el "||" puede funcionar para dar un valor por default

//     for(let i = 0; i < limit; i++){
//     products.push({
//         name: faker.commerce.productName(),// todos estos datos son de la libreria de faker
//         price: parseInt(faker.commerce.price(), 10),
//         image: faker.image.imageUrl()
//     })
//     }
//     res.json(products)// devolvemos el array de productos
// });

/* REPLICAR ESTA RUTA "GET" PARA CAMBIARLO Y HACERLO FUNCIONAR EL BOOM Y LOS DEMAS MIDDLEWARES */

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params; // parametros
    try {
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    try {
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      // intenta
      const product = await service.update(id, body);
      res.status(201).json(product);
    } catch (error) {
      // si falla
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    const product = await service.delete(id);
    res.status(200).json(product);
    try {
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
