const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoURI = "mongodb+srv://root:root@cluster2.lrczczf.mongodb.net/";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const Course = require("./models/Course");

app.post("/course", (req, res) => {
  const { thumbnail, name, author, description, creationDate } = req.body;

  if (!thumbnail || !name || !author) {
    return res
      .status(400)
      .json({ msg: "Please include thumbnail, name, and author" });
  }

  const newCourse = new Course({
    thumbnail,
    name,
    author,
    description,
    creationDate,
  });

  newCourse
    .save()
    .then((course) => res.json(course))
    .catch((err) => console.log(err));
});

app.get("/courses", (req, res) => {
  Course.find()
    .then((courses) => res.json(courses))
    .catch((err) => console.log(err));
});

app.get("/course/:id", (req, res) => {
  const courseId = req.params.id;

  Course.findById(courseId)
    .then((course) => {
      if (!course) {
        return res.status(404).json({ msg: "Course not found" });
      }
      res.json(course);
    })
    .catch((err) => {
      console.error("Error fetching course:", err);
      res.status(500).json({ msg: "Internal server error" });
    });
});

app.put("/course/:id", (req, res) => {
  const { thumbnail, name, author, description } = req.body;
  const courseId = req.params.id;

  Course.findById(courseId)
    .then((course) => {
      if (!course) {
        return res.status(404).json({ msg: "Course not found" });
      }

      if (thumbnail) course.thumbnail = thumbnail;
      if (name) course.name = name;
      if (author) course.author = author;
      if (description) course.description = description;

      course
        .save()
        .then((updatedCourse) => res.json(updatedCourse))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.delete("/course/:id", (req, res) => {
  const courseId = req.params.id;

  Course.findByIdAndDelete(courseId)
    .then((deletedCourse) => {
      if (!deletedCourse) {
        return res.status(404).json({ msg: "Course not found" });
      }
      res.json({ msg: "Course deleted successfully" });
    })
    .catch((err) => console.log(err));
});

app.post("/courses/filter-by-authors", (req, res) => {
  const { authors } = req.body;

  Course.find({ author: { $in: authors } })
    .then((courses) => res.json(courses))
    .catch((err) => console.log(err));
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
