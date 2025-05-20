const genresDb = require("../db/genres");

const genresController = {
  getAll: async (req, res) => {
    try {
      const { searchTerm } = req.query;
      const genres = await (searchTerm
        ? genresDb.search(searchTerm)
        : genresDb.getAll());
      res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const genre = await genresDb.get(id);
      if (!genre) {
        return res
          .status(404)
          .json({ success: false, message: "Genre not found" });
      }
      res.status(200).json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { value } = req.body;
      await genresDb.insert(value);
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
      const { value } = req.body;
      await genresDb.edit(id, value);
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
