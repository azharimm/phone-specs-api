const express = require("express");
const router = express.Router();

const specsController = require("../controllers/specsController");

router.get("/", specsController.index);

module.exports = router;
