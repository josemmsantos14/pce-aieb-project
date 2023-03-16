import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  let navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleLogin = async () => navigate("/login");

  const handleSignup = async () => navigate("/signup");


  return (
    <div className="auth-form-container">
      <h2>Welcome to our page!</h2>
      <button type="button" name="login" onClick={handleLogin}>
        Login
      </button>
      <button type="button" name="signup" onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
}

export default FrontPage;
