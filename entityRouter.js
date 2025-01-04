const express = require("express");
const createDbMethods = require("./db/queries");
const createEntityController = require("./entityController");

const createDynamicRouter = (entityName) => {
  const router = express.Router();
  const dbMethods = createDbMethods(entityName);
  const controller = createEntityController(entityName, dbMethods);

  router.post("/new", controller.createPost);
  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);
  router.delete("/:id/delete", controller.delete);
  router.put("/:id/edit", controller.editPost);

  return router;
};

module.exports = createDynamicRouter;
