const ProductsService = require('../services/productsService');

const getAll = async (_req, res, next) => {
  try {
    const data = await ProductsService.getAll();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
};