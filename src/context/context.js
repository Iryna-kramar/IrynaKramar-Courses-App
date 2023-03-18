import React, { useEffect, useState } from "react";
import axios from "axios";

const CoursesContext = React.createContext();

const CoursesProvider = ({ children }) => {
  const [allData, setAllData] = useState({});
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

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
          // proccess server errors
        }
      })
      .catch((error) => {
        // proccess network errors
      });
  };

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
          // proccess server errors
        }
      })
      .catch((error) => {
        // proccess network errors
      });
  };

  return (
    <CoursesContext.Provider
      value={{
        allData,
        courses,
        course,
        token,
        error,
        fetchTokensData,
        fetchCoursesData,
        fetchCourseData,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export { CoursesProvider, CoursesContext };
