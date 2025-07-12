const albumsDb = require("../db/albums");

const albumsController = {
  getAll: async (req, res) => {
    try {
      const albums = await albumsDb.getAll();
      res.status(200).json(albums);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = albumsController;
