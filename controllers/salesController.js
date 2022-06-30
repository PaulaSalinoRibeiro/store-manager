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

module.exports = {
  createSales,
};