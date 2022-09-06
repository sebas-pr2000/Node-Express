const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const peoplesRouter = require('./peoplesRouter');

// CREANDO UNA RUTA PRINCIPAL

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/peoples', peoplesRouter);
}

// FORMA MAS SENCILLA

// function routerApi(app){
//     app.use("/products", productsRouter)// aqui definimos el endpoint "products" asi que el en archivo de routes no debemos colocarlo asi
//     app.use("/users", usersRouter)
//     app.use("/peoples", peoplesRouter)
// }

module.exports = routerApi;
