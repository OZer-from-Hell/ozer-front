import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
