const express = require("express");
const { getCollege, postCollege } = require("../controllers/college");

const router = express.Router();

router.get("/college", getCollege).post("/college", postCollege);

module.exports = router;
