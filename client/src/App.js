import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListCoursesPage from "./components/ListCoursesPage";
import CourseDetailPage from "./components/CourseDetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<ListCoursesPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
