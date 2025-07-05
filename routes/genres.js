const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genres");

router.get("/", genresController.getAll);
router.post("/new", genresController.create);
router.delete("/:id/delete", genresController.delete);
router.put("/:id/edit", genresController.edit);

module.exports = router;
