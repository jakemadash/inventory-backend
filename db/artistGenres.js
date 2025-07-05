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

  getArtistsByGenreId: async (genreId) => {
    const { rows } = await pool.query(
      `SELECT a.artist
       FROM artists a
       INNER JOIN artist_genres ag ON a.artist_id = ag.artist_id
       WHERE ag.genre_id = $1
       ORDER BY a.artist`,
      [genreId]
    );
    return rows.map((r) => r.artist);
  },
};

module.exports = artistGenresDb;
