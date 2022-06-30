const { Router } = require('express');
const SalesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.post('/', SalesController.createSales);

module.exports = salesRouter;