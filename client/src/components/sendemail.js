import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function SendEmail() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleGoBack = async () => navigate(-1);

  const handleSendemail = async (e) => {
    e.preventDefault();
    console.log(email);

    try {
      const response = await axios.post(
        "http://localhost:8080/users", //ligação à porta do NodeJS
        JSON.stringify({email}),
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
      <h2>Forgot your password?</h2>
      <form className="login-form">
        <div class="inputbox">
          <span>&#9993;</span>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <button type="submit" onClick={(e) => handleSendemail(e)}>
          Recover Password
        </button>
      </form>
    </div>
  );
}

export default SendEmail;
