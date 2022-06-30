const connection = require('./connection');

const createSales = async () => {
  const [row] = await connection
    .execute(
      'INSERT INTO sales (date) VALUES (NOW())',
  );
  
  return {
    id: row.insertId,
  };
};

const addSalesProducts = async (salesId, productId, quantity) => {
  const [rows] = await connection
    .execute(
      `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?,?,?)`,
      [salesId, productId, quantity],
  );
  return {
    id: rows.insertId,
  };
};

module.exports = {
  createSales,
  addSalesProducts,
};