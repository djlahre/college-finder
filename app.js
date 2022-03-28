const fs = require("fs");
const path = require("path");

const collegeSearch = require("./src/college_search");

(async () => {
  const data1 = await collegeSearch();
  const path1 = path.join(__dirname, "/data/college-search.json");
  fs.writeFileSync(path1, JSON.stringify(data1));
})();
