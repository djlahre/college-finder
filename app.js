const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes");
const scrap = require("./src/controllers/scrap");
const URL =
  "mongodb+srv://djlahre:xIemfElBsGmdZag8@cluster0.xwbmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

main()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(URL);
}

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.post("/scrap", scrap);
app.use("/college", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
