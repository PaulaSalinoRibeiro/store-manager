const connection = require('./connection');

const getAll = async () => {
  const [data] = await connection
    .execute('SELECT * FROM products');
  
  return data;
};

const getById = async (id) => {
  const [data] = await connection
    .execute('SELECT * FROM products WHERE id = ?', [id]);
  
  return data;
};

const add = async (name) => {
  const [row] = await connection
    .execute(
      'INSERT INTO products (name) VALUES (?)',
      [name],
  );
  const result = {
    id: row.insertId,
    name,
  };
  return result;
};

const update = async (id, name) => {
  const [rows] = await connection
    .execute(
      `UPDATE products
      SET name = ?
      WHERE id=?`,
      [name, id],
  );
  
  return rows;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
};