import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { CoursesProvider } from "../src/context/context";
import { Courses, CourseDetails } from "./pages";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <div>
      <CoursesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/:courseId" element={<CourseDetails  />} />
          </Routes>
        </BrowserRouter>
      </CoursesProvider>
    </div>
  );
};

export default App;
