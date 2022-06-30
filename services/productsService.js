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
  if (!name) return { error: { code: 'badRequest', message: '"name" is required' } };

  if (name.length < 5) {
    return {
      error: {
        code: 'invalidDate',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  const result = await ProductsModel.add(name);
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
};