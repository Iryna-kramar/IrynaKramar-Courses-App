import React from "react";
import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";


const CourseContent = ({ course }) => {
  return (
    <Wrapper className="content-wrapper">
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
  .card-skills{
    font-weight: 600;
  }
`;

export default CourseContent;
