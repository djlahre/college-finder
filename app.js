require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes");

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const URL = `mongodb+srv://${user}:${password}@cluster0.xwbmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use("/college", router);

app.use("*", (req, res) => {
  res.json({ msg: "URL not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
