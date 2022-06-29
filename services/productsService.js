const ProductsModel = require('../models/productsModel');

const getAll = async () => {
  const data = await ProductsModel.getAll();

  return data;
};

module.exports = {
  getAll,
};