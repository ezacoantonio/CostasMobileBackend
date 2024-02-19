const express = require("express");
const router = express.Router();
const customerTireController = require("../controllers/customerTireController");

// CRUD Operations
router.get("/search", customerTireController.search);
router.get("/", customerTireController.getAll);
router.post("/", customerTireController.create);
router.get("/:id", customerTireController.getOne);
router.put("/:id", customerTireController.update);
router.delete("/:id", customerTireController.delete);

module.exports = router;
