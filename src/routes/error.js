const express = require("express");
const router = express.Router();
const { errorJson } = require("../utils/response");

router.get("*", (req, res) => {
    errorJson(res, `Route not found!`, 404)
});

module.exports = router;
