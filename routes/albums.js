const express = require("express");
const router = express.Router();
const albumsController = require("../controllers/albums");

router.get("/", albumsController.getAll);

module.exports = router;
