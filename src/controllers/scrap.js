const fs = require("fs");
const path = require("path");

const collegeSearch = require("./college_search");
const shiksha = require("./shiksha");

(async () => {
  console.log("Scrapper running...");
  const data1 = await collegeSearch();
  const data2 = await shiksha();

  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }

  const path1 = path.join(__dirname, "/data/college-search.json");
  const path2 = path.join(__dirname, "/data/shiksha.json");
  fs.writeFileSync(path1, JSON.stringify(data1));
  fs.writeFileSync(path2, JSON.stringify(data2));
  console.log("Scraping complete");
})();