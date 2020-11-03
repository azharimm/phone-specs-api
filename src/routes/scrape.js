const express = require("express");
const router = express.Router();

const scrapeController = require("../controllers/scrapeController");

router.get("/", scrapeController.index);

module.exports = router;
