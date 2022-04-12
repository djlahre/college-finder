const fs = require("fs/promises");
const path = require("path");
const College = require("../models/College");

module.exports.getCollege = async function (req, res) {
  const colleges = await College.find().limit(30);
  res.json({ data: colleges });
};

module.exports.uploadCollege = async function () {
  const filePath = path.join(__dirname, "../../data/finalData.json");

  const jsonData = await fs.readFile(filePath, { encoding: "utf-8" });
  const dataArr = JSON.parse(jsonData);
  const uniqueData = dataArr.filter(
    (value, idx, arr) => arr.findIndex((v2) => v2.nirf === value.nirf) === idx
  );
  await College.deleteMany();
  await College.insertMany(uniqueData);
};
