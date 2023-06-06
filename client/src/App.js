import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// import React, { useState } from "react";

import Login from "./components/outside/login";
import SignUp from "./components/outside/signup";
import Home from "./components/outside/home";
import SendEmail from "./components/outside/sendemail";
import RecoverPass from "./components/outside/recoverpass";
import AdminPage from "./components/admin/adminpage";
import AdminGraphs from "./components/admin/admingraphs";
import UserPage from "./components/user/userpage";
import PacientForm from "./components/admin/pacientform";
import UserForms from "./components/user/userforms";
import FHIRMessage from "./components/user/fhirmessage";

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
          <Route exact path="/adminpage/graphs" element={<AdminGraphs />} />
          <Route exact path="/userpage" element={<UserPage />} />
          <Route exact path="/userpage/forms" element={<UserForms />} />
          <Route exact path="/userpage/:id" element={<FHIRMessage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
