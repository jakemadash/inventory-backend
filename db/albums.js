const pool = require("./pool");

const albumsDb = {
  getAll: async () => {
    const { rows } = await pool.query(`
      SELECT year, JSON_AGG(albums.album) AS albums
      FROM albums
      GROUP BY year
      ORDER BY year
    `);
    return rows;
  },

  getAlbumsByArtistId: async (id) => {
    const { rows } = await pool.query(
      "SELECT * FROM albums WHERE artist_id = $1",
      [id]
    );
    return rows;
  },

  insert: async (album) => {
    await pool.query(
      "INSERT INTO albums (album, year, artist_id) VALUES ($1, $2, $3)",
      [album.title, album.year, album.artistId]
    );
  },

  delete: async (id) => {
    await pool.query("DELETE FROM albums WHERE album_id = $1", [id]);
  },
};

module.exports = albumsDb;
