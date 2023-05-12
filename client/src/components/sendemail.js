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

    try {
      if (email !== "") {
        const response = await axios.post(
          "http://localhost:8080/sendemail", //ligação à porta do NodeJS
          JSON.stringify({ email }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Credentials sent!");
        // console.log(response);
        if (response.status === 204) {
          alert("Email sent!");
          navigate("/");
        }
      } else {
        setMsg("Inputed credentials not valid.");
      }
    } catch (error) {
      console.error(error.message);
      if (error.response.status === 401) {
        alert("Invalid credentials!");
      }
      setMsg(error.message);
      console.log(msg);
    }
  };

  return (
    <div className="auth-form-container sendemail-container">
      <button type="button" onClick={handleGoBack} className="goback">
        &#11164;
      </button>
      <h2 className="title">Forgot your password?</h2>
      <form className="login-form">
        <div className="inputbox">
          <span>&#9993;</span>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <button
          className="btn btn-sendemail"
          type="submit"
          onClick={(e) => handleSendemail(e)}
        >
          Send Email
        </button>
      </form>
    </div>
  );
}

export default SendEmail;
