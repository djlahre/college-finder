const fs = require("fs/promises");
const path = require("path");
const College = require("../models/College");

module.exports.getCollege = async function (req, res) {
  const colleges = await College.find();
  res.json({ data: colleges });
};

module.exports.postCollege = async function (req, res) {
  const basePath = path.join(__dirname, "../../data");
  const files = await fs.readdir(basePath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(basePath, files[i]);
    const jsonData = await fs.readFile(filePath, { encoding: "utf-8" });
    const jsObj = JSON.parse(jsonData);
    await College.insertMany(jsObj);
  }
  res.json({ msg: "College data saved to mongodb", files });
};
