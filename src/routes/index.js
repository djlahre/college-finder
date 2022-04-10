const express = require("express");
const { getCollege, postCollege } = require("../controllers/college");

const router = express.Router();

router.route("/").get(getCollege).post(postCollege);

module.exports = router;
