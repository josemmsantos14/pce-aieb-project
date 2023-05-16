import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function RecoverPass() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordverify, setPasswordverify] = useState("");
  const [msg, setMsg] = useState("");

  const handleGoBack = async () => navigate(-1);

  const handleRecoverpass = async (e) => {
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
    <div className="auth-form-container recover-container">
      <button type="button" onClick={handleGoBack} className="goback">
        &#11164;
      </button>
      <h2 className="title">Recover Password</h2>
      <form className="login-form">
        <div className="inputbox">
          <span>&#128477;</span>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="new password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">New password</label>
        </div>
        <div className="inputbox">
          <span>&#128477;</span>
          <input
            type="password"
            id="passwordverify"
            name="passwordverify"
            placeholder="verify password"
            required
            onChange={(e) => setPasswordverify(e.target.value)}
          />
          <label htmlFor="passwordverify">Confirm password</label>
        </div>
        <button
          className="btn btn-recover"
          type="submit"
          onClick={(e) => handleRecoverpass(e)}
        >
          Reset password
        </button>
      </form>
    </div>
  );
}

export default RecoverPass;
