const express = require("express");
const router = express.Router();
const albumsController = require("../controllers/albums");

router.get("/", albumsController.getAll);
router.get("/:id", albumsController.getOne);
router.post("/new", albumsController.create);
router.delete("/:id/delete", albumsController.delete);
router.put("/:id/edit", albumsController.edit);

module.exports = router;
