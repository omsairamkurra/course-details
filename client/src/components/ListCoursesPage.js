import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ListCoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div>
      <h1>List of Courses</h1>
      {courses.map((course) => (
        <div
          key={course._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src={course.thumbnail}
            alt="Course Thumbnail"
            style={{ width: "100px", height: "auto" }}
          />
          <h3>{course.name}</h3>
          <p>
            <strong>Author:</strong> {course.author}
          </p>
          <p>
            <strong>Creation Date:</strong>{" "}
            {new Date(course.creationDate).toLocaleDateString()}
          </p>
          <Link to={`/course/${course._id}`}>
            <button
              style={{
                cursor: "pointer",
                backgroundColor: "lightgreen",
                border: "none",
                borderRadius: "5px",
                width: "100px",
                height: "25px",
              }}
            >
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ListCoursesPage;
