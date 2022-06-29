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

const add = async (name) => {
  if (!name) throw new Error({ code: 404, message: 'name is required' });
  const result = await ProductsModel.add(name);
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
};