const getCollegeUrls = require("./getCollegeUrls");
const getCollegeDetails = require("./getCollegeDetails");

module.exports = async function () {
  const data = [];
  const urls = await getCollegeUrls();
  // urls.length ~= 100
  for (let i = 0; i < 5; i++) {
    const currentData = await getCollegeDetails(urls[i]);
    data.push(...currentData);
  }

  return data;
};
