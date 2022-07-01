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

const getAllSales = async () => {
  const [data] = await connection
    .execute(
      `SELECT S.id as saleId, S.date, SP.product_id as productId, SP.quantity 
        FROM StoreManager.sales as S
        RIGHT JOIN StoreManager.sales_products as SP
        ON S.id = SP.sale_id
        ORDER BY S.id ASC, SP.product_id
      `,
  );
  
  return data;
};

const getSalesById = async (id) => {
  const [data] = await connection
    .execute(
      `SELECT S.id as saleId, S.date, SP.product_id as productId, SP.quantity 
        FROM StoreManager.sales as S
        RIGHT JOIN StoreManager.sales_products as SP
        ON S.id = SP.sale_id
        WHERE S.id = ?
        ORDER BY S.id ASC, SP.product_id`,
      [id],
  );
  
  return data;
};

const remove = async (id) => {
  const [row] = await connection
    .execute(
      'DELETE FROM sales WHERE id = ?',
      [id],
  );
  return row;
};

module.exports = {
  createSales,
  addSalesProducts,
  getAllSales,
  getSalesById,
  remove,
};