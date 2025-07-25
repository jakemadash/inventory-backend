const pool = require("./pool");

const artistsDb = {
  getAll: async () => {
    const query = `
      SELECT 
        a.artist_id,
        a.artist,
        COALESCE(
          JSON_AGG(g.genre ORDER BY g.genre) 
          FILTER (WHERE g.genre IS NOT NULL), 
          '[]'
        ) AS genres,
        COALESCE(
          JSON_AGG(JSON_BUILD_OBJECT('title', al.album, 'year', al.year) ORDER BY al.year)
          FILTER (WHERE al.album_id IS NOT NULL), 
          '[]'
        ) AS albums
      FROM artists a
      LEFT JOIN artist_genres ag ON a.artist_id = ag.artist_id
      LEFT JOIN genres g ON ag.genre_id = g.genre_id
      LEFT JOIN albums al ON al.artist_id = a.artist_id
      GROUP BY a.artist, a.artist_id
      ORDER BY a.artist;
    `;

    const { rows } = await pool.query(query);
    return rows;
  },

  findByName: async (name) => {
    const { rows } = await pool.query(
      "SELECT * FROM artists WHERE artist = $1",
      [name]
    );
    return rows.length > 0 ? rows[0] : null;
  },

  insert: async (name) => {
    const result = await pool.query(
      "INSERT INTO artists (artist) VALUES ($1) RETURNING artist_id",
      [name]
    );
    return result.rows[0].artist_id;
  },

  delete: async (id) => {
    await pool.query("DELETE FROM artists WHERE artist_id = $1", [id]);
  },

  edit: async (id, newName) => {
    await pool.query("UPDATE artists SET artist = $1 WHERE artist_id = $2", [
      newName,
      id,
    ]);
  },
};

module.exports = artistsDb;
