const express = require("express");
const router = express.Router();
const searchRoutes = require("./search");
const scrapeRoutes = require("./scrape");
const phoneRoutes = require("./phone");


const indexController = require('../controllers/index')

router.get("/", indexController.index);
router.use("/brands", phoneRoutes);
router.use("/search", searchRoutes);
router.use("/scrape", scrapeRoutes);

module.exports = router;
