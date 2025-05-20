const albumsDb = require("../db/albums");

const albumsController = {
  getAll: async (req, res) => {
    try {
      const { searchTerm } = req.query;
      const albums = await (searchTerm
        ? albumsDb.search(searchTerm)
        : albumsDb.getAll());
      res.status(200).json(albums);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const album = await albumsDb.get(id);
      if (!album) {
        return res
          .status(404)
          .json({ success: false, message: "Album not found" });
      }
      res.status(200).json(album);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { value } = req.body;
      await albumsDb.insert(value);
      res
        .status(201)
        .json({ success: true, message: "Album created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await albumsDb.delete(id);
      res
        .status(200)
        .json({ success: true, message: "Album deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  edit: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { value } = req.body;
      await albumsDb.edit(id, value);
      res
        .status(200)
        .json({ success: true, message: "Album updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = albumsController;
