import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { ozerNickname, testResult } from "../atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import success from "../assets/success.png";
import soso from "../assets/soso.png";
import fail from "../assets/fail.png";

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
    <div>
      <p>{nickname}...당신은...</p>
      <img src={resultImg} alt="결과" width={300} />
      <button onClick={() => navigate("/rank")}>랭킹보기</button>
      <button onClick={() => navigate("/test")}>다시하기</button>
    </div>
  ) : (
    ""
  );
}

export default Result;
