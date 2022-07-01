const { Router } = require('express');
const ProductsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/', ProductsController.getAll);

productsRouter.get('/search', ProductsController.filterByName);

productsRouter.get('/:id', ProductsController.getById);

productsRouter.post('/', ProductsController.add);

productsRouter.put('/:id', ProductsController.update);

productsRouter.delete('/:id', ProductsController.remove);

module.exports = productsRouter;