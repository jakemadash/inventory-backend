const path = require("path");

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

  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await dbMethods.get(id);
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ success: false, message: "Item not found" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: e.message });
    }
  },

  createGet: (req, res) => {
    res.sendFile(path.join(__dirname, `forms/create${entityName}.html`));
  },

  createPost: async (req, res) => {
    try {
      const { artist } = req.body;
      await dbMethods.insert(artist);
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

  editGet: async (req, res) => {
    const { id } = req.params;
    res.sendFile(
      path.join(__dirname, `../forms/edit${entityName}.html?id=${id}`)
    );
  },

  editPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await dbMethods.edit(id, name);
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
