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

  const tokenOptions = {
    method: "GET",
    headers: {
      // Host: `${host}`,
      "User-Agent": "PostmanRuntime/7.31.1",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // const dataOptions = {
  //   method: "GET",
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //     "User-Agent": "PostmanRuntime/7.31.1",
  //     Accept: "*/*",
  //     "Accept-Encoding": "gzip, deflate, br",
  //     Connection: "keep-alive",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Headers": "Content-Type",
  //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //     Authorization: `Bearer ${tokent}`,
  //   },
  // };

  const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };

  const fetchTokensData = async () => {
    const tokenData = await fetchData(`${tokenUrl}`, tokenOptions);
    setToken(tokenData);
  };

  useEffect(() => {
    fetchTokensData();
    // const fetchCoursesData = async () => {
    //   const allData = await fetchData(`${baseUrl}`, dataOptions);
    //   setData(allData);
    //   setCourses(allData.courses);
    // };
    // fetchCoursesData();
  }, []);

  return (
    <CoursesContext.Provider value={{ courses }}>
      {children}
    </CoursesContext.Provider>
  );
};

export { CoursesProvider, CoursesContext };
