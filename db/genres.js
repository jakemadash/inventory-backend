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

  findByName: async (name) => {
    const { rows } = await pool.query("SELECT * FROM genres WHERE genre = $1", [
      name,
    ]);
    return rows.length > 0 ? rows[0] : null;
  },

  search: async (searchTerm) => {
    const { rows } = await pool.query(
      "SELECT * FROM genres WHERE genre ILIKE $1",
      [`%${searchTerm}%`]
    );
    return rows;
  },

  insert: async (name) => {
    const result = await pool.query(
      "INSERT INTO genres (genre) VALUES ($1) RETURNING genre_id",
      [name]
    );
    return result.rows[0].genre_id;
  },

  delete: async (id) => {
    await pool.query("DELETE FROM genres WHERE id = $1", [id]);
  },

  edit: async (id, newName) => {
    await pool.query("UPDATE genres SET genre = $1 WHERE id = $2", [
      newName,
      id,
    ]);
  },
};

module.exports = genresDb;
