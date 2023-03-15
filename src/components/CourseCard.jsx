import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";


const CourseCard = ({ course }) => {
  return (
    <Wrapper>
      <Link className="card" to={`/${course.id}`}>
        <div>
          <img
            src={course.previewImageLink + "/cover.webp"}
            alt={course.title}
          ></img>
          <div className="card-content">
            <h5 className="card-course-title">{course.title}</h5>
            <div className="card-description">{course.description}</div>
            <div>
              <p className="card-skills">Skills</p>
              <ul>
                {course.meta.skills.map((skill, index) => (
                  <li key={index} skill={skill}>
                    <CheckIcon fontSize="small" /> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="card-lessons">{course.lessonsCount} lessons</div>
          <div className="card-break"></div>
          <div className="card-lesson-rating">
            {course.tags.map((tag, index) => (
              <p key={index} className="card-title">
                {tag}
              </p>
            ))}
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={course.rating}
                precision={0.5}
                readOnly
              />
            </Stack>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  box-shadow: rgb(24 39 75 / 12%) 0px 8px 18px -6px,
    rgb(24 39 75 / 12%) 0px 12px 42px -4px;
  border-radius: 16px;
  overflow: hidden;
  max-width: 365px;
  a {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  img {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    width: 100%;
    height: 150px;
  }
  .card-content {
    padding: 25px 24px 32px;
    flex-direction: column;
    display: flex;
  }
  h5 {
    text-align: left;
    flex: 2 0 auto;
    min-height: 42px;
    margin: 0;
  }
  .card-description,
  .card-skills {
    text-align: left;
    margin-top: 1rem;
  }
  .card-skills,
  .card-lessons {
    font-weight: 600;
  }
  .card-break {
    background-color: rgb(213 215 221);
    height: 1px;
    margin-top: 0.75rem;
  }
  .card-lesson-rating {
    justify-content: space-between;
    align-items: center;
    display: flex;
  }
  .card-title {
    border-color: rgb(69, 43, 234);
    color: rgb(69, 43, 234);
    text-transform: capitalize;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    max-height: 24px;
    display: flex;
  }
`;

export default CourseCard;
