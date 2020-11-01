const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brandController");

router.get("/", brandController.index);

module.exports = router;
