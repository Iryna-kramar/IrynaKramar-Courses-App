import React, { useEffect, useState } from "react";
import axios from "axios";

const CoursesContext = React.createContext();

const CoursesProvider = ({ children }) => {
  const [allData, setAllData] = useState({});
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState({});
  const [isUnlockedLesson, setIsUnlockedLesson] = useState(<div></div>);
  const [currentPage, setCurrentPage] = useState(1);

  const host = "http://api.wisey.app";
  const version = "api/v1";

  let baseUrl = `${host}/${version}/core/preview-courses`;
  let tokenUrl = `${host}/${version}/auth/anonymous?platform=subscriptions`;

  const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };

  // Getting token
  const fetchTokensData = async () => {
    const tokenData = await fetchData(tokenUrl, {
      method: "GET",
    });
    setToken(tokenData.token);
    console.log(token);
  };

  // Getting Courses Data
  const fetchCoursesData = async () => {
    await fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        if (data.success) {
          fetchTokensData();
          setAllData(data);
          setCourses(data.courses);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {});
  };

  // Getting Course Data by ID
  const fetchCourseData = async (courseId) => {
    await fetchData(`${baseUrl}/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        if (data.success) {
          fetchTokensData();
          setCourse(data);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {});
  };

  // Lesson selection
  const handleLessonSelect = (item) => {
    setSelectedLesson(item);
    setIsUnlockedLesson(true);
    if (item.status === "unlocked") {
      setIsUnlockedLesson(true);
    } else {
      setIsUnlockedLesson(false);
    }
  };

  //Pagination Courses pages
  const coursesPerPage = 10;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <CoursesContext.Provider
      value={{
        allData,
        courses,
        course,
        token,
        error,
        selectedLesson,
        isUnlockedLesson,
        currentPage,
        currentCourses,
        coursesPerPage,
        paginate,
        fetchTokensData,
        fetchCoursesData,
        fetchCourseData,
        handleLessonSelect,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export { CoursesProvider, CoursesContext };
