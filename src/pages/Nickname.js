import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ozerId, ozerNickname, ozerlist } from "../atom";
import { useNavigate } from "react-router-dom";

function Nickname() {
  const list = useRecoilValue(ozerlist);
  const [nickname, setNickname] = useRecoilState(ozerNickname);
  const [ozerUserId, setOzerUserId] = useRecoilState(ozerId);

  const navigate = useNavigate();

  const nicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const ozerHandler = () => {
    axios
      .post(`api/ozers/items`, { list, nickname })
      .then((res) => {
        setOzerUserId(res.data.id);
        navigate("/test");
      })
      .catch((err) => {
        if (err.response.status == 400) {
          alert("유효하지 않은 닉네임 입니다!");
        }
      });
  };
  return (
    <NicknameContainer>
      <MainBox>
        <NicknameDiv>
          <NicknameTitle>닉네임을 입력해주세요!</NicknameTitle>
          <NicknameInput placeholder="닉네임 20자 이내" type="text" onChange={nicknameChange}></NicknameInput>
          <NicknameBtn onClick={ozerHandler}>테스트 시작</NicknameBtn>
        </NicknameDiv>
      </MainBox>
    </NicknameContainer>
  );
}

export default Nickname;

const NicknameContainer = styled.div`
  width: 100%;
`;

const MainBox = styled.div`
  width: 375px;
  height: 100vh;
  margin: 0 auto;
`;

const NicknameTitle = styled.h1`
  height: 20%;
  padding: 10px;
  font-size: 1.8rem;
  font-weight: 900;
  font-family: "NeoDunggeunmoPro-Regular";
`;

const NicknameDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const NicknameInput = styled.input`
  width: 250px;
  margin-bottom: 40px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 20px;
  font-size: 1.4em;
  font-family: "NeoDunggeunmoPro-Regular";
`;
const NicknameBtn = styled.button`
  width: 180px;
  height: 60px;
  padding: 10px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 20px;
  margin-top: 20px;
  font-size: 1.2rem;
  font-family: "NeoDunggeunmoPro-Regular";
  cursor: pointer;
`;
