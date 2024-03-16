const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  thumbnail: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Course = mongoose.model("course", CourseSchema);
