const ProductsService = require('../services/productsService');
const httpStatusCode = require('../helpers/httpStatusCode');

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

const add = async (req, res, next) => {
  const { name } = req.body;
  try {
    const data = await ProductsService.add(name);
    if (data.error) {
      return res.status(httpStatusCode[data.error.code]).json({ message: data.error.message });
    }
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await ProductsService.update(name, id);
    if (result.error) {
      return res.status(httpStatusCode[result.error.code]).json({ message: result.error.message });
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await ProductsService.remove(id);
    if (data.error) {
      return res.status(httpStatusCode[data.error.code]).json({ message: data.error.message });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};