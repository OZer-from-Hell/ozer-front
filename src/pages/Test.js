import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ozerlist } from "../atom";
import axios from "axios";

function Test() {
  const list_id = useRecoilValue(ozerlist);
  const [testData, setTestData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}api/questions/list?list_id=${list_id}`)
      .then((res) => {
        console.log(res.data);
        setTestData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <TestContainer>
      {testData.map((testData) => {
        return (
          <TestDiv>
            <TestNum>{testData.order}번째 문제</TestNum>
            <TestQuestion></TestQuestion>
          </TestDiv>
        );
      })}
    </TestContainer>
  );
}

export default Test;

const TestContainer = styled.div`
  width: 375px;
  height: 100vh;
  margin: 0 auto;
`;
const TestDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
const TestNum = styled.h2``;
const TestQuestion = styled.div``;
