import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import axios from "axios";
import { Reset } from "styled-reset";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
root.render(
  <RecoilRoot>
    <Reset />
    <App />
  </RecoilRoot>
);
