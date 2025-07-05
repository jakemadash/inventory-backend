const genresDb = require("../db/genres");
const artistsDb = require("../db/artists");
const artistGenresDb = require("../db/artistGenres");

const getArtistId = async (artistName) => {
  let artistId;
  const existingArtist = await artistsDb.findByName(artistName);
  if (existingArtist) artistId = existingArtist.artist_id;
  else artistId = await artistsDb.insert(artistName);
  return artistId;
};

const genresController = {
  getAll: async (req, res) => {
    try {
      const genres = await genresDb.getAll();
      res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { genre, artists } = req.body;
      const genreId = await genresDb.insert(genre);

      if (artists?.length > 0) {
        for (const artistName of artists) {
          const artistId = await getArtistId(artistName);
          await artistGenresDb.insert(artistId, genreId);
        }
      }

      res
        .status(201)
        .json({ success: true, message: "Genre created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await genresDb.delete(id);
      res
        .status(200)
        .json({ success: true, message: "Genre deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  edit: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { genre, artists } = req.body;
      await genresDb.edit(id, genre);

      const currentArtists = await artistGenresDb.getArtistsByGenreId(id);
      const artistsToAdd = artists.filter((a) => !currentArtists.includes(a));
      const artistsToRemove = currentArtists.filter(
        (a) => !artists.includes(a)
      );

      for (const artistName of artistsToAdd) {
        const artistId = await getArtistId(artistName);
        await artistGenresDb.insert(artistId, id);
      }

      for (const artistName of artistsToRemove) {
        const artist = await artistsDb.findByName(artistName);
        if (artist) {
          await artistGenresDb.delete(artist.artist_id, id);
        }
      }

      res
        .status(200)
        .json({ success: true, message: "Genre updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = genresController;
