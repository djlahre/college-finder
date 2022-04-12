const axios = require("axios").default;
const cheerio = require("cheerio");

async function getCollgeDetails(url) {
  const allCollege = [];

  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  $("#rankingTupleWrapper").each(function (i, ele) {
    const val = $(ele).find(".rank_tuplev1");

    for (let i = 0; i < val.length; i++) {
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

      if (
        nirf &&
        !nirf.includes("-") &&
        name &&
        location &&
        rating &&
        fees &&
        salary
      ) {
        const collegeDetail = {};
        collegeDetail.course = "BTech";
        collegeDetail.nirf = nirf;
        collegeDetail.name = name;
        collegeDetail.location = location;
        collegeDetail.rating = rating;
        collegeDetail.totalFees = parseInt(fees);
        collegeDetail.averageSalary = parseInt(salary);
        allCollege.push(collegeDetail);
      }
    }
  });

  return allCollege;
}

module.exports = getCollgeDetails;
