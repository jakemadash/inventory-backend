const pool = require("./pool");

const albumsDb = {
  getAll: async () => {
    const { rows } = await pool.query("SELECT * FROM albums");
    return rows;
  },

  get: async (id) => {
    const { rows } = await pool.query("SELECT * FROM albums WHERE id = $1", [
      id,
    ]);
    return rows.length > 0 ? rows[0] : null;
  },

  search: async (searchTerm) => {
    const { rows } = await pool.query(
      "SELECT * FROM albums WHERE name ILIKE $1",
      [`%${searchTerm}%`]
    );
    return rows;
  },

  insert: async (name) => {
    await pool.query("INSERT INTO albums (name) VALUES ($1)", [name]);
  },

  delete: async (id) => {
    await pool.query("DELETE FROM albums WHERE id = $1", [id]);
  },

  edit: async (id, newName) => {
    await pool.query("UPDATE albums SET name = $1 WHERE id = $2", [
      newName,
      id,
    ]);
  },
};

module.exports = albumsDb;
