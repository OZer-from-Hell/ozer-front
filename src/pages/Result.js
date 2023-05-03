import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { ozerNickname, testResult } from "../atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import success from "../assets/success.png";
import soso from "../assets/soso.png";
import fail from "../assets/fail.png";
import { hover } from "@testing-library/user-event/dist/hover";

function Result() {
  const nickname = useRecoilValue(ozerNickname);
  const result = useRecoilValue(testResult);
  const navigate = useNavigate();
  const [resultImg, setResultImg] = useState(null);

  useEffect(() => {
    if (nickname == null || result == null) {
      navigate("/");
    } else {
      if (result.score >= 80) {
        console.log("졸업 !");
        setResultImg(success);
      } else if (result.score < 80 && result.score >= 50) {
        console.log("분발해");
        setResultImg(soso);
      } else {
        console.log("다음 기수로 연행");
        setResultImg(fail);
      }
    }
  }, []);

  return resultImg ? (
    <ResultContainer>
      <ResultNicknameDiv>
        <ResultNickname>"{nickname}"...당신은...</ResultNickname>
      </ResultNicknameDiv>
      <ResultImgDiv>
        <img src={resultImg} alt="결과" width={270} />
      </ResultImgDiv>
      <ResultBtnDiv>
        <ResultBtn onClick={() => navigate("/rank")}>랭킹보기</ResultBtn>
        <ResultBtn onClick={() => navigate("/test")}>다시하기</ResultBtn>
      </ResultBtnDiv>
    </ResultContainer>
  ) : (
    ""
  );
}

export default Result;

const ResultContainer = styled.div`
  width: 375px;
  height: 100vh;
  margin: 0 auto;
`;

const ResultNicknameDiv = styled.div`
  width: 375px;
  margin: 0 auto;
  /* width: 100%; */
  margin-top: 30px;
  display: flex;
  justify-content: center;
  border: 3px solid black;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const ResultNickname = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
`;

const ResultImgDiv = styled.div`
  width: 375px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border: 3px solid black;
  border-radius: 20px;
`;

const ResultBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ResultBtn = styled.button`
  padding: 10px 20px 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: 3px solid black;
  border-radius: 20px;
  margin: 5px;
  background: none;
`;
