import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { MutedPlayer } from "react-muted-video-player";
import CourseContent from "../components/CourseContent";


const CourseCard = ({ course }) => {
  const [isShown, setIsShown] = useState(true);

  return (
    <Wrapper>
      <Link className="card" to={`/${course.id}`}>
        <div>
          <div
            onMouseEnter={() => setIsShown(false)}
            onMouseLeave={() => setIsShown(true)}
          >
            {isShown ? (
              <img
                src={course.previewImageLink + "/cover.webp"}
                alt={course.title}
              ></img>
            ) : (
              <MutedPlayer
                className="card-video"
                src={course.meta.courseVideoPreview.link}
                type="application/x-mpegURL"
                autoPlay={true}
                muted={true}
                playsInline={true}
              />
            )}
          </div>
          <CourseContent course={course} />
        </div>
        <div className="content-wrapper">
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
  img,
  .card-video {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    width: 100%;
    height: 150px;
  }
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
