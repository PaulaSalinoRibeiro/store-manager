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

const update = async (name, id) => {
  if (!name) return { error: { code: 'badRequest', message: '"name" is required' } };

  if (name.length < 5) {
    return {
      error: {
        code: 'invalidDate',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  const product = await ProductsModel.getById(id);
  
  if (product.length === 0) return { error: { code: 'notFound', message: 'Product not found' } };

  await ProductsModel.update(id, name);

  return {
    id,
    name,
  };
};

module.exports = {
  getAll,
  getById,
  add,
  update,
};