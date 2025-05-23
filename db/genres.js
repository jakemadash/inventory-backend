const pool = require("./pool");

const genresDb = {
  getAll: async () => {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
  },

  get: async (id) => {
    const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [
      id,
    ]);
    return rows.length > 0 ? rows[0] : null;
  },

  search: async (searchTerm) => {
    const { rows } = await pool.query(
      "SELECT * FROM genres WHERE name ILIKE $1",
      [`%${searchTerm}%`]
    );
    return rows;
  },

  insert: async (name) => {
    await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
  },

  delete: async (id) => {
    await pool.query("DELETE FROM genres WHERE id = $1", [id]);
  },

  edit: async (id, newName) => {
    await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [
      newName,
      id,
    ]);
  },
};

module.exports = genresDb;
