import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  console.log(localStorage);

  const handleGoBack = async () => navigate("/");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("email: ", email, " password: ", password);

    try {
      if (email !== "" && password !== "") {
        const response = await axios.post(
          "http://localhost:8080/login", //ligação à porta do NodeJS e ao respetivo caminho relativo ao login
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        let user = response.data.body;
        // console.log("user: ", user);

        // console.log("Credentials sent!");
        if (user.response.UserType === "admin") {
          navigate("/adminpage", {
            state: {
              user: user.response,
            },
          });
          localStorage.setItem("user", JSON.stringify(user.response));
        } else if (user.response.UserType === "user") {
          navigate("/userpage", {
            state: {
              user: user.response,
            },
          });
          localStorage.setItem("user", JSON.stringify(user.response));
        } else {
          alert("Invalid User!");
        }
      } else {
        alert("Please input valid credentials.");
      }
    } catch (error) {
      if (error.response.status === 204) {
        console.error(error.message);
        setMsg(error.message);
      } else if (error.response.status === 401) {
        console.error(error.message);
        setMsg(error.response.data);
      } else if (error.response.status === 500) {
        console.error(error.message);
        setMsg(error.message);
      } else {
        setMsg("Internal error ocurred!");
      }
    }
  };

  return (
    <div className="login-container auth-form-container">
      <button type="button" onClick={handleGoBack} className="goback">
        &#11164;
      </button>
      <div>
        <h2 className="login-title">Login</h2>
        <form className="login-form">
          <div className="inputbox email-inp">
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
          <div className="inputbox">
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
          <button
            type="submit"
            className="btn-login btn"
            onClick={(e) => handleLogin(e)}
          >
            Log In
          </button>
        </form>
        <footer className="after-form">
          <span>
            <a href="/signup" className="regist">
              Create account
            </a>
          </span>
          <span>
            <a href="/sendemail" className="forgot">
              Forgot my pass
            </a>
          </span>
        </footer>
        {msg && <p className="error"> {msg.message} </p>}
      </div>
    </div>
  );
}

export default Login;
