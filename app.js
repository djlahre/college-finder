require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes");

const URL = process.env.MONGODB_URL;

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
