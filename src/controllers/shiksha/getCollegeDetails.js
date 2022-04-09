const axios = require("axios").default;
const cheerio = require("cheerio");

const DEFAULT_VALUE = "No data";

async function getCollgeDetails(url) {
  const allCollege = [];

  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  $("#rankingTupleWrapper").each(function (i, ele) {
    const val = $(ele).find(".rank_tuplev1");

    for (let i = 0; i < val.length; i++) {
      const collegeDetail = {
        nirf: 0,
        course: "BTech",
        name: "",
        location: "",
        rating: 0,
        totalFees: 0,
        averageSalary: 0,
      };
      const nirf = $(val[i]).find(".circleText").text().trim();
      const name = $(val[i]).find(".f14_bold").text().trim();
      const location = $("h1[class='h1 clr_0']").text().split(" ")[4];
      const rating = $(val[i]).find(".rating-block.rvw-lyr").text().slice(0, 3);
      const fees =
        $(val[i])
          .find(".flex_v.text--secondary")
          .first()
          .text()
          .trim()
          .split(" ")[3] * 100000;
      const salary =
        $(val[i])
          .find(".flex_v.text--secondary")
          .first()
          .next()
          .text()
          .trim()
          .split(" ")[3] * 100000;

      collegeDetail.nirf = nirf || DEFAULT_VALUE;
      collegeDetail.name = name || DEFAULT_VALUE;
      collegeDetail.location = location || DEFAULT_VALUE;
      collegeDetail.rating = rating || DEFAULT_VALUE;
      collegeDetail.totalFees = fees || DEFAULT_VALUE;
      collegeDetail.averageSalary = salary || DEFAULT_VALUE;
      allCollege.push(collegeDetail);
    }
  });

  return allCollege;
}

module.exports = getCollgeDetails;
