const path = require("path");

const createEntityController = (entityName, dbMethods) => ({
  list: async (req, res) => {
    const { searchTerm } = req.query;
    const items = await (searchTerm
      ? dbMethods.search(searchTerm)
      : dbMethods.getAll());
    console.log(`${entityName} List:`, items);
    res.send(
      `${entityName} List: ` + items.map((item) => item.name).join(", ")
    );
  },

  createGet: (req, res) => {
    res.sendFile(path.join(__dirname, `../forms/create${entityName}.html`));
  },

  createPost: async (req, res) => {
    const { name } = req.body;
    await dbMethods.insert(name);
    res.redirect("/");
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await dbMethods.delete(id);
    res.redirect("/");
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
