import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Test from "./pages/Test";
import Nickname from "./pages/Nickname";
import Result from "./pages/Result";
import Rank from "./pages/Rank";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/test" element={<Test />} />
        <Route path="/result" element={<Result />} />
        <Route path="/rank" element={<Rank />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
