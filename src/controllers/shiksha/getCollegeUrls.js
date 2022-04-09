const axios = require("axios").default;
const cheerio = require("cheerio");

const URL = "https://www.shiksha.com";

async function getCollegeUrls() {
  const urls = [];
  const res = await axios.get(URL);
  const $ = cheerio.load(res.data);

  const onHoverElement = $(".global-wrapper");

  for (let i = 5; i < 17; i++) {
    const href = $(onHoverElement)
      .find(".g_lev1 :contains('Engineering')")
      .next()
      .find(".submenu2 tbody")
      .first()
      .first()
      .find(`.g_lev3 :nth-child(${i}) a`)
      .attr("href");

    urls.push(URL + href);
  }

  return urls;
}

module.exports = getCollegeUrls;
