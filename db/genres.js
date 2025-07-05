const pool = require("./pool");

const genresDb = {
  getAll: async () => {
    const query = `SELECT 
    g.genre_id,
    g.genre,
    COALESCE(json_agg(a.artist ORDER BY a.artist) FILTER (WHERE a.artist IS NOT NULL), '[]') AS artists
    FROM genres g
    LEFT JOIN artist_genres ag ON g.genre_id = ag.genre_id
    LEFT JOIN artists a ON ag.artist_id = a.artist_id
    GROUP BY g.genre, g.genre_id
    ORDER BY g.genre;
    `;

    const { rows } = await pool.query(query);
    return rows;
  },

  findByName: async (name) => {
    const { rows } = await pool.query("SELECT * FROM genres WHERE genre = $1", [
      name,
    ]);
    return rows.length > 0 ? rows[0] : null;
  },

  insert: async (name) => {
    const result = await pool.query(
      "INSERT INTO genres (genre) VALUES ($1) RETURNING genre_id",
      [name]
    );
    return result.rows[0].genre_id;
  },

  delete: async (id) => {
    await pool.query("DELETE FROM genres WHERE genre_id = $1", [id]);
  },

  edit: async (id, newName) => {
    await pool.query("UPDATE genres SET genre = $1 WHERE genre_id = $2", [
      newName,
      id,
    ]);
  },
};

module.exports = genresDb;
