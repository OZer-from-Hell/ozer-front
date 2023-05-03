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
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const select = (e) => {
    console.log(e.target.id);
    setLoading(true);
    if (e.target.id == questions[index].answer) {
      console.log("정답 !!");
      setStudent(student_true);
      setTutor(tutor_true);
      setAnswers((answers) => (answers += "1"));
    } else {
      console.log("오답 !!");
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
              console.log(res.data);
              setResult(res.data);
              navigate("/result");
            })
            .catch((err) => {
              console.log(err);
            });
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
      <ProgressBar completed={parseInt(((index + 1) / questions.length) * 100)} />
      <TestDiv>
        <TestNum>문제 {index + 1}.</TestNum>
        <TestQuestion>{questions[index].content}</TestQuestion>
        {loading ? (
          <p>{student == student_true ? "O" : "X"}</p>
        ) : (
          <TestOption>
            <button id="1" onClick={select}>
              {questions[index].no1}
            </button>
            <button id="2" onClick={select}>
              {questions[index].no2}
            </button>
            <button id="3" onClick={select}>
              {questions[index].no3}
            </button>
            <button id="4" onClick={select}>
              {questions[index].no4}
            </button>
          </TestOption>
        )}
      </TestDiv>
      <div>
        <img src={tutor} alt="tutor" width={300} />
        <img src={student} alt="student" width={300} />
      </div>
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

const TestOption = styled.div``;
