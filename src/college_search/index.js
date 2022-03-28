const getCollegeUrls = require("./getCollegeUrls");
const getCollegeDetails = require("./getCollegeDetails");

async function scrap() {
  const data = [];
  const urls = await getCollegeUrls();

  //urls.length
  for (let i = 0; i < 5; i++) {
    const currentData = await getCollegeDetails(urls[i]);
    data.push(...currentData);
  }

  return data;
}

module.exports = scrap;
