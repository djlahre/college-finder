const axios = require("axios").default;
const cheerio = require("cheerio");

module.exports = async function (url) {
  const allCollege = [];
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  $("#results ol li").each((i, el) => {
    const nirf = $(el)
      .find(".first-rank-fift")
      .first()
      .text()
      .trim()
      .split(" ")[3];

    const collegeName = $(el).find("h2").text().trim();
    const location = $(el).find("small").text().trim();
    const rating = $(el)
      .find(".media-right div")
      .text()
      .replace(/\s\s+/g, "")
      .trim();

    const totalFees = $(el)
      .find("dl :contains('Total Fees')")
      .next()
      .text()
      .trim()
      .replace(/\D/g, "");

    const placements = $(el)
      .find("dl :contains('Placements')")
      .next()
      .text()
      .trim()
      .replace(/\s\s+/g, " ")
      .split(" ");

    const average = placements[3] * 100_000;
    // const highest = placements[8] * 100_000;

    if (
      nirf &&
      !nirf.includes("-") &&
      collegeName &&
      location &&
      rating &&
      totalFees &&
      average
    ) {
      const collegeDetail = {};
      collegeDetail.course = "BTech";
      collegeDetail.nirf = nirf;
      collegeDetail.name = collegeName;
      collegeDetail.location = location;
      collegeDetail.rating = rating;
      collegeDetail.totalFees = parseInt(totalFees);
      collegeDetail.averageSalary = parseInt(average);
      allCollege.push(collegeDetail);
    }
  });
  return allCollege;
};
