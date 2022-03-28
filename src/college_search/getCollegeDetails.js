const axios = require("axios").default;
const cheerio = require("cheerio");

const DEFAULT_VALUE = "No data";

async function getCollgeDetails(url) {
  const allCollege = [];
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  $("#results ol li").each((i, el) => {
    const college = {
      nirf: 0,
      course: "BTech",
      name: "",
      location: "",
      rating: 0,
      totalFees: 0,
      averageSalary: 0,
    };

    const nirf = $(el)
      .find(".first-rank-fift")
      .first()
      .text()
      .trim()
      .split(" ")[3];

    const collegeName = $(el).find("h2").text().trim();
    const location = $(el).find("small").text().trim();
    const rating = $(el).find(".media-right div").text().replace(/\s\s+/g, "");

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

    college.nirf = nirf || DEFAULT_VALUE;
    college.name = collegeName;
    college.location = location;
    college.rating = rating || DEFAULT_VALUE;
    college.totalFees = parseInt(totalFees) || DEFAULT_VALUE;
    college.averageSalary = average || DEFAULT_VALUE;

    if (collegeName.length != 0) {
      allCollege.push(college);
    }
  });
  return allCollege;
}

module.exports = getCollgeDetails;
