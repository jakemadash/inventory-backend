const express = require("express");
const router = express.Router();
const artistsController = require("../controllers/artists");

router.get("/", artistsController.getAll);
router.get("/:id", artistsController.getOne);
router.post("/new", artistsController.create);
router.delete("/:id/delete", artistsController.delete);
router.put("/:id/edit", artistsController.edit);

module.exports = router;
