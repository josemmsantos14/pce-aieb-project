// import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  let navigate = useNavigate();
  // const [msg, setMsg] = useState("");

  const handleLogin = async () => navigate("/login");

  const handleSignup = async () => navigate("/signup");

  return (
    <div className="home-container auth-form-container">
      <h2 className="home-title">Welcome to our page!</h2>
      <div className="btns-redirect">
        <button
          type="button"
          name="login"
          className="btn-in-home btn "
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          type="button"
          name="signup"
          className="btn-in-home btn "
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default FrontPage;
