const express = require("express");
const createDbMethods = require("./db/queries");
const createEntityController = require("./entityController");

const createDynamicRouter = (entityName) => {
  const router = express.Router();
  const dbMethods = createDbMethods(entityName);
  const controller = createEntityController(entityName, dbMethods);

  // Define routes dynamically
  router.get("/", controller.list);
  router.get("/new", controller.createGet);
  router.post("/new", controller.createPost);
  router.post("/:id/delete", controller.delete);
  router.get("/:id/edit", controller.editGet);
  router.post("/:id/edit", controller.editPost);

  return router;
};

module.exports = createDynamicRouter;
