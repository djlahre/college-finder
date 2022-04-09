const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  nirf: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    default: "Btech",
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  totalFees: {
    type: String,
    required: true,
  },
  averageSalary: {
    type: String,
    required: true,
  },
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;
