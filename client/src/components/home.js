import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  let navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleLogin = async () => navigate("/login");

  const handleSignup = async () => navigate("/signup");

  return (
    <div className="auth-form-container home-container">
      <h2>Welcome to our page!</h2>
      <div class="btns-redirect">
        <button
          type="button"
          name="login"
          class="btn-in-home"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          type="button"
          name="signup"
          class="btn-in-home"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default FrontPage;
