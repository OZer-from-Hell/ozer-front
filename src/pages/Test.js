import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { ozerlist, ozerId, testResult } from "../atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import student_false from "../assets/student_false.gif";
import student_true from "../assets/student_true.gif";
import student_none from "../assets/student_none.gif";
import tutor_false from "../assets/tutor_false.gif";
import tutor_true from "../assets/tutor_true.gif";
import tutor_none from "../assets/tutor_none.gif";
import Parser from "html-react-parser";

function Test() {
  const list_id = useRecoilValue(ozerlist);
  const user_id = useRecoilValue(ozerId);
  const [result, setResult] = useRecoilState(testResult);
  const [questions, setQuestions] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState("");
  const navigate = useNavigate();
  const [student, setStudent] = useState(student_none);
  const [tutor, setTutor] = useState(tutor_none);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (list_id == null || user_id == null) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    axios
      .get(`api/questions/list?list_id=${list_id}`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {});
  }, []);

  const select = (e) => {
    setLoading(true);
    if (e.target.id == questions[index].answer) {
      setStudent(student_true);
      setTutor(tutor_true);
      setAnswers((answers) => (answers += "1"));
    } else {
      setStudent(student_false);
      setTutor(tutor_false);
      setAnswers((answers) => (answers += "0"));
    }
  };

  useEffect(() => {
    if (questions) {
      setTimeout(() => {
        if (index == questions.length - 1) {
          axios
            .patch(`api/ozers/items`, { user_id, answers })
            .then((res) => {
              setResult(res.data);
              navigate("/result");
            })
            .catch((err) => {});
        } else {
          setIndex((index) => (index += 1));
          setStudent(student_none);
          setTutor(tutor_none);
          setLoading(false);
        }
      }, 1500);
    }
  }, [answers]);

  return questions ? (
    <TestContainer>
      <ProgressDiv>
        <ProgressBar completed={parseInt(((index + 1) / questions.length) * 100)} bgColor="black" />
      </ProgressDiv>

      <TestDiv>
        <TestNum>문제 {index + 1}.</TestNum>
        <TestQuestion>{Parser(questions[index].content)}</TestQuestion>
        {loading ? (
          <QuestionAnswer>{student == student_true ? "O" : "X"}</QuestionAnswer>
        ) : (
          <TestOption>
            <TestOptionDiv>
              <TestBtn id="1" onClick={select}>
                {Parser(questions[index].no1)}
              </TestBtn>
              <TestBtn id="2" onClick={select}>
                {Parser(questions[index].no2)}
              </TestBtn>
            </TestOptionDiv>
            <TestOptionDiv>
              <TestBtn id="3" onClick={select}>
                {Parser(questions[index].no3)}
              </TestBtn>
              <TestBtn id="4" onClick={select}>
                {Parser(questions[index].no4)}
              </TestBtn>
            </TestOptionDiv>
          </TestOption>
        )}
      </TestDiv>
      <TestGif>
        <TestBear>
          <img src={tutor} alt="tutor" width={150} />
        </TestBear>
        <TestRabbit>
          <img src={student} alt="student" width={150} />
        </TestRabbit>
      </TestGif>
    </TestContainer>
  ) : (
    ""
  );
}

export default Test;

const TestContainer = styled.div`
  width: 375px;
  height: 100vh;
  margin: 0 auto;
`;

const ProgressDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
`;

const TestDiv = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
const TestNum = styled.h2`
  font-family: "NeoDunggeunmoPro-Regular";
`;
const TestQuestion = styled.div`
  display: flex;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 20px;
  font-family: "NeoDunggeunmoPro-Regular";
`;

const TestOptionDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TestOption = styled.div`
  width: 100%;
  height: 199px;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const TestBtn = styled.button`
  padding: 20px;
  margin: 10px;
  border: none;
  border-radius: 20px;
  color: white;
  background-color: black;
  font-size: 1rem;
  font-family: "NeoDunggeunmoPro-Regular";
  cursor: pointer;
`;

const TestGif = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  // margin-top: 20px;
`;

const TestBear = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: pink;
  margin-right: 5px;
`;
const TestRabbit = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #9999ff;
  margin-left: 5px;
`;

const QuestionAnswer = styled.div`
  height: 239px;
  font-size: 6rem;
  font-weight: bold;
  line-height: 199px;
`;
