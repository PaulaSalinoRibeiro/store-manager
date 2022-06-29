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

module.exports = {
  getAll,
  getById,
  add,
};