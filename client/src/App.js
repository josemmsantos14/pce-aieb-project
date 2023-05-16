import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// import React, { useState } from "react";

import Login from "./components/outside/login";
import SignUp from "./components/outside/signup";
import Home from "./components/outside/home";
import SendEmail from "./components/outside/sendemail";
import RecoverPass from "./components/outside/recoverpass";
import AdminPage from "./components/admin/adminpage";
import UserPage from "./components/userpage";
import PacientForm from "./components/admin/pacientform";

function App() {
  // const [currentForm, setCurrentForm] = useState("login");
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
          <Route exact path="/adminpage/:id" element={<PacientForm />} />
          <Route exact path="/userpage" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
