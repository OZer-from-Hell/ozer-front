import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { ozerlist, ozerId, testResult } from "../atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      <p>오져랭킹</p>
      {ranking.map((el, idx) => {
        return (
          <p key={idx}>
            {idx + 1}위 : {el.nickname} {el.score}점
          </p>
        );
      })}
      <button onClick={() => navigate("/test")}>다시하기</button>
    </div>
  ) : (
    ""
  );
}

export default Rank;
