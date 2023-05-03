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
        console.log(res.data);
        setOzerUserId(res.data.id);
        navigate("/test");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <NicknameContainer>
      <NicknameDiv>
        <NicknameTitle>오저네임 입력</NicknameTitle>
        <NicknameInput
          placeholder="이름을 입력하세요!"
          type="text"
          onChange={nicknameChange}
        ></NicknameInput>
        <NicknameBtn onClick={ozerHandler}>오저 입장</NicknameBtn>
      </NicknameDiv>
    </NicknameContainer>
  );
}

export default Nickname;

const NicknameContainer = styled.div`
  width: 375px;
  height: 100vh;
  margin: 0 auto;
`;

const NicknameTitle = styled.h1`
  padding: 10px;
`;

const NicknameDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
const NicknameInput = styled.input`
  width: 250px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 20px;
`;
const NicknameBtn = styled.button`
  width: 100px;
  padding: 10px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 10px;
  margin-top: 20px;
`;
