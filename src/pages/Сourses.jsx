import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Loader from "../components/Loader";
import CoursesCard from "../components/CourseCard";
import { CoursesContext } from "../context/context";
import Pagination from "@mui/material/Pagination";

const Courses = () => {
  const {
    courses,
    fetchCoursesData,
    currentPage,
    currentCourses,
    coursesPerPage,
    paginate,
  } = useContext(CoursesContext);

  useEffect(() => {
    fetchCoursesData();
  }, [currentPage]);

  return (
    <Wrapper>
      {courses.length !== "0" ? (
        <div className="courses-cards">
          {currentCourses.map((course, index) => (
            <CoursesCard key={index} course={course} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
      <div className="pagination">
        {courses.length > coursesPerPage && (
          <Pagination
            variant="outlined"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(courses.length / coursesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1188px;
  margin: 0 auto;

  .courses-cards {
    padding: 50px 0;
    display: grid;
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 29px;
    }
    @media screen and (max-width: 1023px) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px;
    }
    @media screen and (max-width: 767px) {
      justify-items: center;
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }
  }
  .pagination {
    margin-top: 100px;
    align-items: center;
  }
`;

export default Courses;
