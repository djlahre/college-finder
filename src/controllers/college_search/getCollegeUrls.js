const axios = require("axios").default;
const cheerio = require("cheerio");

const URL = "https://www.collegesearch.in/engineering-colleges-india";

async function getCollegeUrls() {
  const urls = [];
  const res = await axios.get(URL);
  const $ = cheerio.load(res.data);
  const anchorList = $("#Cities .filter_lower a");

  for (let i = 0; i < anchorList.length; i++) {
    urls.push($(anchorList[i]).attr("href"));
  }

  return urls;
}

module.exports = getCollegeUrls;
