const ProductsModel = require('../models/productsModel');

const getAll = async () => {
  const data = await ProductsModel.getAll();

  return data;
};

const getById = async (id) => {
  const data = await ProductsModel.getById(id);

  if (data.length === 0) return [];

  return data;
};

module.exports = {
  getAll,
  getById,
};