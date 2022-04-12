const fs = require("fs");
const path = require("path");

const collegeSearch = require("./college_search");
const shiksha = require("./shiksha");

module.exports = async function () {
  console.log("Scrapper running...");

  const data1 = await collegeSearch();
  const data2 = await shiksha();

  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }

  const finalData = data1.concat(data2);
  finalData.sort((a, b) => a.nirf - b.nirf);

  const filePath = path.join(__dirname, "../../data/finalData.json");
  fs.writeFileSync(filePath, JSON.stringify(finalData));

  console.log("Scraping complete");
};
