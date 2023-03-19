import React, { useState } from "react";
import axios from "axios";

const CoursesContext = React.createContext();

const CoursesProvider = ({ children }) => {
  const [allData, setAllData] = useState({});
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState({});
  const [isUnlockedLesson, setIsUnlockedLesson] = useState(<div></div>);
  const [currentPage, setCurrentPage] = useState(1);

  axios.defaults.baseURL = "https://api.wisey.app/api/v1";

  const setToken = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  // Getting token
  const fetchTokensData = async () => {
    try {
      const response = await axios.get(
        "/auth/anonymous?platform=subscriptions"
      );
      setToken(response.data.token);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Getting Courses Data
  const fetchCoursesData = async () => {
    await fetchTokensData();
    setIsLoading(true);
    const response = await axios
      .get("/core/preview-courses")
      .catch((err) => console.log(err));
    console.log(response);
    if (response) {
      setAllData(response.data);
      setCourses(response.data.courses);
    } else {
      setError(response.data.message);
    }
  };

  // Getting Course Data by ID
  const fetchCourseData = async (courseId) => {
    await fetchTokensData();
    setIsLoading(true);
    const response = await axios
      .get(`/core/preview-courses/${courseId}`)
      .catch((err) => console.log(err));
    console.log(response);
    if (response) {
      setCourse(response.data);
    } else {
      setError(response.data.message);
    }
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
        error,
        isLoading,
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
