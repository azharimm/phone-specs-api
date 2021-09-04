const express = require("express");
const router = express.Router();


const indexController = require('../../controllers/v2/index')
const brandController = require('../../controllers/v2/brandController')
const specController = require('../../controllers/v2/specController')

router.get("/", indexController.index);
router.get("/brands", brandController.index);
router.get("/brands/:slug", brandController.show);
router.get("/:slug", specController.index);

module.exports = router;
