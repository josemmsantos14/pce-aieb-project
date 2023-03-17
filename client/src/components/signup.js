import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function SignUp() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleGoBack = async () => navigate(-1);

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(name, email, password);

    try {
      if (name !== "" && email !== "" && password !== "") {
        const response = await axios.post(
          "http://localhost:8080/signup", //ligação à porta do NodeJS
          JSON.stringify({ name, email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Credentials sent!");
      } else {
        setMsg("Inputed credentials not valid.");
      }
    } catch (error) {
      console.error(error.message);
      setMsg(error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <button type="button" onClick={handleGoBack} class="goback">
        &#11164;
      </button>
      <h2>Sign Up</h2>
      <form className="login-form">
        <div class="inputbox">
          <span>&#10077;</span>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div class="inputbox">
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
        <div class="inputbox">
          <span>&#128477;</span>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" onClick={(e) => handleSignUp(e)}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
