const pool = require("./pool");

const yearsDb = {
  getAll: async () => {
    const { rows } = await pool.query("SELECT * FROM years");
    return rows;
  },

  get: async (id) => {
    const { rows } = await pool.query("SELECT * FROM years WHERE id = $1", [
      id,
    ]);
    return rows.length > 0 ? rows[0] : null;
  },

  search: async (searchTerm) => {
    const { rows } = await pool.query(
      "SELECT * FROM years WHERE name ILIKE $1",
      [`%${searchTerm}%`]
    );
    return rows;
  },

  insert: async (name) => {
    await pool.query("INSERT INTO years (name) VALUES ($1)", [name]);
  },

  delete: async (id) => {
    await pool.query("DELETE FROM years WHERE id = $1", [id]);
  },

  edit: async (id, newName) => {
    await pool.query("UPDATE years SET name = $1 WHERE id = $2", [newName, id]);
  },
};

module.exports = yearsDb;
