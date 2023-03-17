import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function RecoverPass() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordverify, setPasswordverify] = useState("");
  const [msg, setMsg] = useState("");

  const handleGoBack = async () => navigate(-1);

  const handleRecorerpass = async (e) => {
    e.preventDefault();
    console.log(password, passwordverify);

    try {
      const response = await axios.post(
        "http://localhost:8080/users", //ligação à porta do NodeJS
        JSON.stringify({ password, passwordverify }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Credentials sent!");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="auth-form-container">
      <button type="button" onClick={handleGoBack} class="goback">
        &#11164;
      </button>
      <h2>Recover Password</h2>
      <form className="login-form">
        <div class="inputbox">
          <span>&#128477;</span>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">New password</label>
        </div>
        <div class="inputbox">
          <span>&#128477;</span>
          <input
            type="password"
            id="passwordverify"
            name="passwordverify"
            required
            onChange={(e) => setPasswordverify(e.target.value)}
          />
          <label htmlFor="passwordverify">Confirm password</label>
        </div>
        <button type="submit" onClick={(e) => handleRecorerpass(e)}>
          Reset password
        </button>
      </form>
    </div>
  );
}

export default RecoverPass;
