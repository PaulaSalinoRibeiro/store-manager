const connection = require('./connection');

const addSales = async () => {
  const [row] = await connection
    .execute(
      'INSERT INTO sales (date)',
  );
  
  return {
    id: row.insertId,
  };
};

module.exports = {
  addSales,
};