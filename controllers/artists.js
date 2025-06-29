const artistsDb = require("../db/artists");
const genresDb = require("../db/genres");
const artistGenresDb = require("../db/artistGenres");

const getGenreId = async (genreName) => {
  let genreId;
  const existingGenre = await genresDb.findByName(genreName);
  if (existingGenre) genreId = existingGenre.genre_id;
  else genreId = await genresDb.insert(genreName);
  return genreId;
};

const artistsController = {
  getAll: async (req, res) => {
    try {
      const { searchTerm } = req.query;
      const artists = await (searchTerm
        ? artistsDb.search(searchTerm)
        : artistsDb.getAll());
      res.status(200).json(artists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const artist = await artistsDb.get(id);
      if (!artist) {
        return res
          .status(404)
          .json({ success: false, message: "Artist not found" });
      }
      res.status(200).json(artist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { artist, genres } = req.body;
      const artistId = await artistsDb.insert(artist);

      if (genres?.length > 0) {
        for (const genreName of genres) {
          const genreId = await getGenreId(genreName);
          await artistGenresDb.insert(artistId, genreId);
        }
      }

      res
        .status(201)
        .json({ success: true, message: "Artist created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await artistsDb.delete(id);
      res
        .status(200)
        .json({ success: true, message: "Artist deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  edit: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { artist, genres } = req.body;
      await artistsDb.edit(id, artist);

      const currentGenres = await artistGenresDb.getGenresByArtistId(id);
      const genresToAdd = genres.filter((g) => !currentGenres.includes(g));
      const genresToRemove = currentGenres.filter((g) => !genres.includes(g));

      for (const genreName of genresToAdd) {
        const genreId = await getGenreId(genreName);
        await artistGenresDb.insert(id, genreId);
      }

      for (const genreName of genresToRemove) {
        const genre = await genresDb.findByName(genreName);
        if (genre) {
          await artistGenresDb.delete(id, genre.genre_id);
        }
      }

      res
        .status(200)
        .json({ success: true, message: "Artist updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = artistsController;
