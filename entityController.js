const path = require("path");

const createEntityController = (entityName, dbMethods) => ({
  getAll: async (req, res) => {
    const { searchTerm } = req.query;
    const items = await (searchTerm
      ? dbMethods.search(searchTerm)
      : dbMethods.getAll());
    console.log(`${entityName} List:`, items);
    res.json(items);
  },

  getOne: async (req, res) => {
    const { id } = req.params;
    const item = await dbMethods.get(id);
    if (item) {
      res.send(item.name);
    } else {
      res.status(404).send("Item not found");
    }
  },

  createGet: (req, res) => {
    res.sendFile(path.join(__dirname, `forms/create${entityName}.html`));
  },

  createPost: async (req, res) => {
    console.log(req.body);
    const { artist } = req.body;
    await dbMethods.insert(artist);
    res.redirect("/artists");
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.params.id);
      console.log("id:", id);
      await dbMethods.delete(id);
      res.status(200).json({ success: true });
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
    const { id } = req.params;
    const { name } = req.body;
    await dbMethods.edit(id, name);
    res.redirect("/");
  },
});

module.exports = createEntityController;
