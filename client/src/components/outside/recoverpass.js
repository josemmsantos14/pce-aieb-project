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
        "http://localhost:8080/sendemail/recover", //ligação à porta do NodeJS
        JSON.stringify({ password, passwordverify }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Credentials sent!");
      if (response.status === 204) {
        alert("Password changed!");
        navigate("/login");
      }
      else {
        setMsg("Passwords should match.");
      }
    } catch (error) {
      console.error(error.message);
      if (error.response.status === 401) {
        alert("Passwords should match.");
      }
      setMsg(error.message);
      console.log(msg);
    }
  };

  return (
    <div className="recover-container auth-form-container">
      <button type="button" onClick={handleGoBack} className="goback">
        &#11164;
      </button>
      <h2 className="recover-title">Recover Password</h2>
      <form className="recover-form">
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
