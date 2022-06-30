const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

const validateSale = (sales) => {
  const isNegativeOrZero = sales.some((sale) => sale.quantity <= 0);
  const existProductId = sales.some((sale) => !sale.productId);
  const existQuantity = sales.some((sale) => !sale.quantity);

  if (isNegativeOrZero) {
    return {
        error: {
          code: 'invalidDate',
          message: '"quantity" must be greater than or equal to 1',
        },
      }; 
  }

  if (existProductId) return { error: { code: 'badRequest', message: '"productId" is required' } };

  if (existQuantity) return { error: { code: 'badRequest', message: '"quantity" is required' } };
  
  return { sucess: 'Its OK' };
};

const createSales = async (sales) => {
  const isSaleValidate = validateSale(sales);

  if (isSaleValidate.error) return isSaleValidate;

  const allProductsIds = await Promise.all(sales
    .map((sale) => ProductsModel.getById(sale.productId)));
  
  const existId = allProductsIds.some((product) => product.length === 0);

  if (existId) return { error: { code: 'notFound', message: 'Product not found' } };

  const result = await SalesModel.createSales();

  await Promise.all(sales
    .map((sale) => SalesModel.addSalesProducts(result.id, sale.productId, sale.quantity)));
  
  return {
    id: result.id,
    itemsSold: [...sales],
  };
};

module.exports = {
  createSales,
};