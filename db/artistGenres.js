const pool = require("./pool");

const artistGenresDb = {
  insert: async (artistId, genreId) => {
    await pool.query(
      "INSERT INTO artist_genres (artist_id, genre_id) VALUES ($1, $2)",
      [artistId, genreId]
    );
  },

  delete: async (artistId, genreId) => {
    await pool.query(
      "DELETE FROM artist_genres WHERE artist_id = $1 AND genre_id = $2",
      [artistId, genreId]
    );
  },

  getGenresByArtistId: async (artistId) => {
    const { rows } = await pool.query(
      `SELECT g.genre
       FROM genres g
       INNER JOIN artist_genres ag ON g.genre_id = ag.genre_id
       WHERE ag.artist_id = $1
       ORDER BY g.genre`,
      [artistId]
    );
    return rows.map((r) => r.genre);
  },
};

module.exports = artistGenresDb;
