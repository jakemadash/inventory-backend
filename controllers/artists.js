const artistsDb = require("../db/artists");

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
      console.log("genres", genres, typeof genres);
      const artistId = await artistsDb.insert(artist);

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
      const { artist } = req.body;
      await artistsDb.edit(id, artist);
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
