const SalesService = require('../services/salesServices');
const httpStatusCode = require('../helpers/httpStatusCode');

const createSales = async (req, res, next) => {
  const sales = req.body;
  try {
    const result = await SalesService.createSales(sales);

    if (result.error) {
      return res.status(httpStatusCode[result.error.code]).json({ message: result.error.message });
    }

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getAllSales = async (_req, res, next) => {
  try {
    const data = await SalesService.getAllSales();

    if (data.error) {
      return res.status(httpStatusCode[data.error.code]).json({ message: data.error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getSalesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await SalesService.getSalesById(id);

    if (data.error) {
      return res.status(httpStatusCode[data.error.code]).json({ message: data.error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await SalesService.remove(id);
    if (result.error) {
      return res.status(httpStatusCode[result.error.code]).json({ message: result.error.message });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const result = await SalesService.update(id, data);
    if (result.erro) {
      return res.status(httpStatusCode[result.error.code]).json({ message: result.error.message });
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
  remove,
  update,
};