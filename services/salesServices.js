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

const getAllSales = async () => {
  const data = await SalesModel.getAllSales();

  if (data.length === 0) return { error: { code: 'notFound', message: 'Sale not found' } };

  return data;
};

const serialize = (data) => ({
    date: data.date,
    productId: data.productId,
    quantity: data.quantity,
  });

const getSalesById = async (id) => {
  const data = await SalesModel.getSalesById(id);

  if (data.length === 0) return { error: { code: 'notFound', message: 'Sale not found' } };

  return data.map((sale) => serialize(sale));
};

const remove = async (id) => {
  const data = await SalesModel.getSalesById(id);
  if (data.length === 0) return { error: { code: 'notFound', message: 'Sale not found' } };

  const row = await SalesModel.remove(id);
  return row;
};

const update = async (id, sales) => {
  const isValidate = validateSale(sales);

  if (isValidate.error) return isValidate;

  const allProductsIds = await Promise.all(sales
    .map((sale) => ProductsModel.getById(sale.productId)));

  const existId = allProductsIds.some((product) => product.length === 0);

  if (existId) return { error: { code: 'notFound', message: 'Product not found' } };

  const saleId = await SalesModel.getSalesById(id);
  
  if (saleId.length === 0) return { error: { code: 'notFound', message: 'Sale not found' } };

  await Promise.all(sales.map((sale) => SalesModel.update(id, sale.productId, sale.quantity)));
  
  return {
    saleId: +id,
    itemsUpdated: sales,
  };
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
  remove,
  update,
};