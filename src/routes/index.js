const express = require("express");
const { getCollege, postCollege } = require("../controllers/college");
const scrap = require("../controllers/scrap");
const router = express.Router();

router.route("/").get(getCollege).post(postCollege);
router.post("/scrap", scrap);

module.exports = router;
