const express = require("express");
const scrapper = require("../controllers/scrapper");
const { getCollege, uploadCollege } = require("../controllers/college");

const router = express.Router();

router.get("/", getCollege).post("/scrap-and-upload", scrapAndUpload);

async function scrapAndUpload(req, res) {
  await scrapper();
  await uploadCollege();
  res.json({ msg: "scrap and upload completed" });
}

module.exports = router;
