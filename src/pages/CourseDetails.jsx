import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { CoursesContext } from "../context/context";
import { useParams } from "react-router-dom";
import ReactHlsPlayer from "react-player";
import CourseContent from "../components/CourseContent";

const CourseDetails = () => {
  const {
    course,
    fetchCourseData,
    selectedLesson,
    isUnlockedLesson,
    handleLessonSelect,
  } = useContext(CoursesContext);

  const { courseId } = useParams();
  console.log(courseId);

  useEffect(() => {
    fetchCourseData(courseId);
  }, [courseId]);

  return (
    <Wrapper>
      <div className="course-details-item">
        <div className="content-wrapper">
          <ReactHlsPlayer
            url={course.meta.courseVideoPreview.link}
            type="application/x-mpegURL"
            controls
          />
        </div>
      </div>
      <div className="course-details-item">
        <CourseContent course={course} />
      </div>
      <div className="course-details-item">
        <div className="content-wrapper">
          <p>Lessons</p>

          <ul>
            {course.lessons.map((lesson, index) => (
              <li className="lessons-title" key={index} lesson={lesson}>
                <button
                  value={lesson}
                  onClick={() => handleLessonSelect(lesson)}
                >
                  {lesson.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="course-details-item">
        <div className="grid-item content-wrapper">
          {isUnlockedLesson ? (
            <ReactHlsPlayer
              url={selectedLesson.link + ".webp"}
              type="application/x-mpegURL"
              controls
            />
          ) : (
            <div>The Lesson is not available</div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  grid-gap: 20px;
  max-width: 1188px;
  margin: 0 auto;
  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .course-details-item {
    display: flex;
    align-items: center;
  }
  p {
    font-weight: 600;
  }
  .lessons-title {
    border-color: rgb(69, 43, 234);
    border-style: solid;
    border-width: 1px;
    justify-content: center;
    align-items: center;
    display: flex;
    width: fit-content;
    margin: 10px 0;
    padding: 0 30px;
    border-radius: 30px;
    height: 40px;
    transition: 0.3s;
    :hover {
      box-shadow: rgb(24 39 75 / 12%) 0px 8px 8px -6px,
        rgb(24 39 75 / 12%) 0px 12px 5px -4px;
    }
    button {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      background: transparent;
      text-decoration: none;
      cursor: pointer;
      text-transform: capitalize;
      font: inherit;
      border: none;
      background-color: transparent;
      color: inherit;
    }
  }
`;

export default CourseDetails;
