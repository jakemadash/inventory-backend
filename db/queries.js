const pool = require("./pool");

const createDbMethods = (tableName) => ({
  getAll: async () => {
    const { rows } = await pool.query(`SELECT * FROM ${tableName}`);
    return rows;
  },

  search: async (searchTerm) => {
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE name ILIKE $1`,
      [`%${searchTerm}%`]
    );
    return rows;
  },

  insert: async (name) => {
    await pool.query(`INSERT INTO ${tableName} (name) VALUES ($1)`, [name]);
  },

  delete: async (id) => {
    await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
  },

  edit: async (id, newName) => {
    await pool.query(`UPDATE ${tableName} SET name = $1 WHERE id = $2`, [
      newName,
      id,
    ]);
  },
});

module.exports = createDbMethods;
