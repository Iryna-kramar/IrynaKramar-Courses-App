import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-container"></div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100wh;
  .nav-container {
    height: 60px;
    background-color: rgb(75, 18, 167);
  }
`;

export default Navbar;
