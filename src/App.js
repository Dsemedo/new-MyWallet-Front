import Login from "./components/Login";
import Inputs from "./components/Inputs";
import Outputs from "./components/Outputs";
import SignUp from "./components/SignUp.js";
import Statement from "./components/Statement/Statement";
import GlobalStyles from "./assets/GlobalStyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/inputs" element={<Inputs />} />
        <Route path="/outputs" element={<Outputs />} />
        <Route path="/statement" element={<Statement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
