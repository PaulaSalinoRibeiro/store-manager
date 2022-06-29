const ProductsService = require('../services/productsService');

const getAll = async (_req, res, next) => {
  try {
    const data = await ProductsService.getAll();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [data] = await ProductsService.getById(id);
   
    if (!data) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
};