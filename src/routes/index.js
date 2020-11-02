const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        status: true,
        data: "Phone Specs API",
    });
});

module.exports = router;
