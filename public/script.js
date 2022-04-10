const scrapRef = document.querySelector("#scrap-new-data");
const refreshRef = document.querySelector("#refresh");
const tbody = document.querySelector("tbody");

scrapRef.addEventListener("click", scrapNewData);
window.addEventListener("load", loadCollegeData);
refreshRef.addEventListener("click", loadCollegeData);

async function loadCollegeData() {
  tbody.innerHTML = "";
  const res = await axios.get("/college");
  const colleges = res.data.data;

  for (const college of colleges) {
    // const tr = `<tr>
    // <td>${college.nirf}</td>
    // <td>${college.course}</td>
    // <td>${college.name}</td>
    // <td>${college.location}</td>
    // <td>${college.rating}</td>
    // <td>${college.totalFees}</td>
    // <td>${college.averageSalary}</td>
    // </tr>`;

    // tbody.innerHTML += tr;

    delete college.__v;
    delete college._id;

    const tr = document.createElement("tr");
    for (const key in college) {
      const td = document.createElement("td");
      td.innerText = college[key];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}

async function scrapNewData() {
  scrapRef.classList.add("disabled");
  const res1 = await axios.post("/scrap");
  const res2 = await axios.post("/college");
  scrapRef.classList.remove("disabled");
  console.log(res1.data);
  console.log(res2.data);
}
