const { Router } = require('express');
const ProductsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/', ProductsController.getAll);

productsRouter.get('/:id', ProductsController.getById);

module.exports = productsRouter;