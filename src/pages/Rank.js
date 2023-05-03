import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { ozerlist, ozerId, testResult } from "../atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function Rank() {
  const list_id = useRecoilValue(ozerlist);
  const [ranking, setRanking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`api/ozers/items?list_id=${list_id}`)
      .then((res) => {
        console.log(res.data);
        setRanking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return ranking ? (
    <RankingContainer>
      <RankDiv>
        <RankText>오져랭킹</RankText>
      </RankDiv>
      <RankMainDiv>
        {ranking.map((el, idx) => {
          return (
            <p key={idx}>
              {idx + 1}위 : {el.nickname} {el.score}점
            </p>
          );
        })}
      </RankMainDiv>
      <RankBtnDiv>
        <RankBtn onClick={() => navigate("/test")}>다시하기</RankBtn>
      </RankBtnDiv>
    </RankingContainer>
  ) : (
    ""
  );
}

export default Rank;

const RankingContainer = styled.div`
  /* width: 375px; */
  height: 100vh;
  margin: 0 auto;
`;

const RankDiv = styled.div`
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

const RankText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const RankMainDiv = styled.div`
  width: 375px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 500px;
  overflow: scroll;
  border: 3px solid black;
  border-radius: 20px;
`;

const RankBtnDiv = styled.div`
  width: 375px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const RankBtn = styled.button`
  padding: 10px 25px 10px 25px;
  font-size: 1rem;
  font-weight: bold;
  border: 3px solid black;
  border-radius: 20px;
  margin-top: 10px;
  background: none;
`;
