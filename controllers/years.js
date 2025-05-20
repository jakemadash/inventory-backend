// controllers/years.js
const yearsDb = require("../db/years");

const yearsController = {
  getAll: async (req, res) => {
    try {
      const { searchTerm } = req.query;
      const years = await (searchTerm
        ? yearsDb.search(searchTerm)
        : yearsDb.getAll());
      res.status(200).json(years);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const year = await yearsDb.get(id);
      if (!year) {
        return res
          .status(404)
          .json({ success: false, message: "Year not found" });
      }
      res.status(200).json(year);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { value } = req.body;
      await yearsDb.insert(value);
      res
        .status(201)
        .json({ success: true, message: "Year created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await yearsDb.delete(id);
      res
        .status(200)
        .json({ success: true, message: "Year deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  edit: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { value } = req.body;
      await yearsDb.edit(id, value);
      res
        .status(200)
        .json({ success: true, message: "Year updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = yearsController;
