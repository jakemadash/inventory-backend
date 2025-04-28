const createEntityController = (entityName, dbMethods) => ({
  getAll: async (req, res) => {
    try {
      const { searchTerm } = req.query;
      const items = await (searchTerm
        ? dbMethods.search(searchTerm)
        : dbMethods.getAll());
      res.status(200).json(items);
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: e.message });
    }
  },

  createPost: async (req, res) => {
    try {
      const { value } = req.body;
      await dbMethods.insert(value);
      res
        .status(201)
        .json({ success: true, message: `${entityName} created successfully` });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: e.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      console.log("id:", id);
      await dbMethods.delete(id);
      res
        .status(200)
        .json({ success: true, message: `${entityName} deleted successfully` });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: e.message });
    }
  },

  editPost: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { value } = req.body;
      await dbMethods.edit(id, value);
      res
        .status(200)
        .json({ success: true, message: `${entityName} updated successfully` });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: e.message });
    }
  },
});

module.exports = createEntityController;
