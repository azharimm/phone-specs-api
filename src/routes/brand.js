const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brandController");

router.get("/", brandController.index);
router.get("/:brand_slug", brandController.show);

module.exports = router;
