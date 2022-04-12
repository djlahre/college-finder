const modal = document.querySelector(".modal");
const scrapRef = document.querySelector("#scrap-and-refresh");
const tbody = document.querySelector("tbody");

window.addEventListener("load", getCollegeData);

async function getCollegeData() {
  tbody.innerHTML = "";
  const res = await axios.get("/college");
  const colleges = res.data.data;

  for (const college of colleges) {
    const tr = `<tr>
    <td>${college.nirf}</td>
    <td>${college.course}</td>
    <td>${college.name}</td>
    <td>${college.location}</td>
    <td>${college.rating}</td>
    <td>${college.totalFees}</td>
    <td>${college.averageSalary}</td>
    </tr>`;
    tbody.innerHTML += tr;
  }
}

scrapRef.addEventListener("click", scrapAndRefresh);

async function scrapAndRefresh() {
  if (confirm("This process will take few minutes. Do you want to continue?")) {
    modal.classList.add("d-flex");
    const res = await axios.post("/college/scrap-and-upload");
    await getCollegeData();
    modal.classList.remove("d-flex");
    console.log(res.data);
  }
}
