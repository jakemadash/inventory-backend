const pool = require("./pool");

const artistGenresDb = {
  insert: async (artistId, genreId) => {
    await pool.query(
      "INSERT INTO artist_genres (artist_id, genre_id) VALUES ($1, $2)",
      [artistId, genreId]
    );
  },
};

module.exports = artistGenresDb;
