import React, { useEffect, useState } from "react";

const CoursesContext = React.createContext();

const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState({});
  const [token, setToken] = useState("");

  const host = `http://api.wisey.app`;
  const version = `api/v1`;

  let baseUrl = `${host}/${version}/core/preview-courses`;
  let tokenUrl = `${host}/${version}/auth/anonymous?platform=subscriptions`;



  const dataOptions = {
    method: "GET",
    // headers: {
    //   // "User-Agent": "PostmanRuntime/7.31.1",
    //   // Accept: "*/*",
    //   // "Accept-Encoding": "gzip, deflate, br",
    //   // Connection: "keep-alive",
    //   // "Access-Control-Allow-Origin": "*",
    //   // Authorization: `Bearer ${token}`,
    // },
  };

  const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };

  const fetchTokensData = async () => {
    const tokenData = await fetchData(`${tokenUrl}`, dataOptions);
    setToken(tokenData.token);
  };

  useEffect(() => {
    // const fetchCoursesData = async () => {
    //   const allData = await fetchData(`${baseUrl}`, dataOptions);
    //   setData(allData);
    //   setCourses(allData.courses);
    // };
    // fetchCoursesData();
    fetchTokensData();
  }, []);

  return (
    <CoursesContext.Provider value={{ courses }}>
      {children}
    </CoursesContext.Provider>
  );
};

export { CoursesProvider, CoursesContext };
