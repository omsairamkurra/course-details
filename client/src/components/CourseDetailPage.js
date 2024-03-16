import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`http://localhost:5000/course/${id}`);
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/course/${id}`, { method: "DELETE" });
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h1>Course Detail</h1>
      <img
        style={{ width: "500px", height: "auto" }}
        src={course.thumbnail}
        alt={course.name}
      />
      <h2>{course.name}</h2>
      <p>Author: {course.author}</p>
      <p>Description: {course.description}</p>
      <button
        style={{
          cursor: "pointer",
          backgroundColor: "red",
          border: "none",
          borderRadius: "5px",
          width: "100px",
          height: "25px",
        }}
        onClick={handleDelete}
      >
        Delete Course
      </button>
    </div>
  );
}

export default CourseDetailPage;
