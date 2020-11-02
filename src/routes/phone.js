const express = require("express");
const router = express.Router();

const phoneController = require("../controllers/phoneController");

router.get("/", phoneController.index);
router.get("/:brand_slug", phoneController.show);
router.get("/:brand_slug/:phone_name_slug", phoneController.specs);

module.exports = router;
