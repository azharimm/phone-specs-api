const express = require("express");
const router = express.Router();


const indexController = require('../../controllers/v2/index')
const brandController = require('../../controllers/v2/brandController')
const specController = require('../../controllers/v2/specController')
const searchController = require('../../controllers/v2/searchController')
const miscController = require('../../controllers/v2/miscController')

router.get("/", indexController.index);
router.get("/brands", brandController.index);
router.get("/brands/:slug", brandController.show);
router.get("/search", searchController.index);
router.get("/latest", miscController.index);
router.get("/top-by-interest", miscController.topInterest);
router.get("/top-by-fans", miscController.topFans);
router.get("/:slug", specController.index);

module.exports = router;
