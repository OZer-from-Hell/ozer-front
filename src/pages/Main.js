import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Student from "../assets/student.png";
import Tutor from "../assets/tutor.png";

function Main() {
  const [number, setNumber] = useState(1);
  const [totalData, setTotalData] = useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}api/ozers/items/totalOzer?list_id=${number}`)
      .then((res) => {
        setTotalData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MainContainer>
      <MainBox>
        <MainLine>
          <TutorImg>
            <img src={Tutor} alt="메인2" width={80} />
          </TutorImg>

          <Title>오즈 코딩 고사</Title>
          <ImageContainer>
            <img src={Student} alt="메인1" width={220} />
          </ImageContainer>
          <div>
            {"number" in totalData && (
              <TotalDiv>
                <TotalNum>누적 참여자 수 : {totalData.number}</TotalNum>
              </TotalDiv>
            )}
          </div>
          <BtnDiv>
            <Link to="/nickname">
              <StartButton>시작하기</StartButton>
            </Link>
          </BtnDiv>
        </MainLine>
      </MainBox>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  width: 100%;
  background-color: black;
`;

const MainBox = styled.div`
  width: 375px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "HealthsetBambooStd";
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
`;

const MainLine = styled.div`
  border: 9px solid black;
  border-radius: 20px;
  width: 340px;
  height: 95%;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 10px;
  font-size: 45px;
  font-weight: 900;
  font-family: "NeoDunggeunmoPro-Regular";
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 30px 0;
`;

const TotalDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const TotalNum = styled.div`
  margin: 20px;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StartButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;

const TutorImg = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  padding-right: 25px;
`;
