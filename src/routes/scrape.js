const express = require("express");
const router = express.Router();

const scrapeController = require("../controllers/scrapeController");

router.get("/", scrapeController.index);
router.get("/test", scrapeController.test);

module.exports = router;
