import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import React, { useState } from "react";

import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          {/* <FrontPage /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
