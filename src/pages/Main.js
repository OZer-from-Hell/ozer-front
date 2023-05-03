import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Main() {
  return (
    <MainContainer>
      <h1>ozer hell...!</h1>
      <div>
        <Link to="/nickname">
          <button>시작하기</button>
        </Link>
      </div>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
