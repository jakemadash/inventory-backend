const express = require("express");
const router = express.Router();
const yearsController = require("../controllers/years");

router.get("/", yearsController.getAll);
router.get("/:id", yearsController.getOne);
router.post("/new", yearsController.create);
router.delete("/:id/delete", yearsController.delete);
router.put("/:id/edit", yearsController.edit);

module.exports = router;
