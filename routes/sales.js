const { Router } = require('express');
const SalesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.post('/', SalesController.createSales);

salesRouter.get('/', SalesController.getAllSales);

salesRouter.get('/:id', SalesController.getSalesById);

salesRouter.delete('/:id', SalesController.remove);

salesRouter.put('/:id', SalesController.update);

module.exports = salesRouter;