import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import React, { useState } from "react";

import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";
import SendEmail from "./components/sendemail";
import RecoverPass from "./components/recoverpass";
import AdminPage from "./components/adminpage";
import UserPage from "./components/userpage";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/sendemail" element={<SendEmail />} />
          <Route exact path="/recoverpass" element={<RecoverPass />} />
          <Route exact path="/adminpage" element={<AdminPage />} />
          <Route exact path="/userpage" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
